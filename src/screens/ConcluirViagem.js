import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';

import { setMensagem } from '../store/actions/mensagem';
import { concluirViagem } from '../store/actions/viagem';
import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import Botao from '../components/Botao';

class ConcluirViagem extends React.Component {
  state = {
    id: 0,
    saida: '',
    km_inicial: 0,
    veiculo: 0,
    motorista: 0,

    descricao: '',
    km_final: 0,
    sem_movimentacao: false,

    errQuilometragem: '',
  };

  componentDidMount = () => {
    const { viagemId: id } = this.props.route.params;

    if (id) {
      axios
        .get(`viagens/${id}`)
        .then(res => {
          const { saida, km_inicial, descricao, veiculo, motorista } = res.data;

          this.setState({
            id,
            saida,
            km_inicial,
            km_final: km_inicial,
            descricao,
            veiculo: veiculo.id,
            motorista: motorista.id,
          });
        })
        .catch(err => {
          this.props.set_mensagem(err);
        });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Viagem');
    }
  };

  isValid = () => {
    const { km_inicial, km_final, sem_movimentacao } = this.state;

    this.setState({
      errQuilometragem: '',
    });

    if (isNaN(km_final)) {
      this.setState({
        errQuilometragem: 'Insira uma quilometragem válida!',
        km_final: km_inicial,
      });
      return false;
    }

    if (km_inicial === km_final && !sem_movimentacao) {
      Alert.alert(
        'KM inicial = KM final',
        'Para viagens sem movimentação marque a opção!',
      );
      return false;
    }

    if (parseFloat(km_final) < parseFloat(km_inicial)) {
      this.setState({
        errQuilometragem:
          'A quilometragem final não pode ser menor que a inicial!',
        km_final: km_inicial,
      });
      return false;
    }
    return true;
  };

  concluir = () => {
    if (this.isValid()) {
      const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm');

      const {
        id,
        saida,
        descricao,
        km_inicial,
        km_final,
        veiculo,
        motorista,
        sem_movimentacao,
      } = this.state;

      const dados = {
        id: id,
        viagem: {
          saida: saida,
          chegada: dataAtual,
          descricao: sem_movimentacao
            ? `Sem movimentação: ${descricao}`
            : descricao,
          km_inicial: km_inicial,
          km_final: km_final,
          veiculo: veiculo,
          motorista: motorista,
        },
      };
      this.props.onConcluirViagem(dados);
    }
  };

  render() {
    const { isSubmetendo } = this.props;

    return isSubmetendo ? (
      <Loader isLoading={isSubmetendo} />
    ) : (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Titulo titulo="Concluir Viagem" />

          <Text style={styles.title}>
            Complete os dados a seguir sobre a viagem
          </Text>
          <Text style={styles.title}>
            (Altere a quilometragem para a qual é registrada no painel do
            veículo)
          </Text>

          <CheckBox
            title="Viagem sem movimentação?"
            checked={this.state.sem_movimentacao}
            onPress={() =>
              this.setState({
                sem_movimentacao: !this.state.sem_movimentacao,
                km_final: this.state.km_inicial,
              })
            }
          />

          <Input
            keyboardType="numeric"
            label="Quilometragem *"
            placeholder="KM atual"
            errorMessage={this.state.errQuilometragem}
            returnKeyType="next"
            onSubmitEditing={() => this.input_2.focus()}
            blurOnSubmit={false}
            value={`${this.state.km_final}`}
            onChangeText={km_final => this.setState({ km_final })}
            disabled={this.state.sem_movimentacao}
            disabledInputStyle={{
              backgroundColor: commonStyles.colors.secondary.main,
            }}
          />

          <Input
            label="Comentário (opcional)"
            placeholder="Comentário sobre a viagem"
            ref={input => (this.input_2 = input)}
            returnKeyType="done"
            onSubmitEditing={this.concluir}
            value={this.state.descricao}
            onChangeText={descricao => this.setState({ descricao })}
          />

          <Botao
            onPress={() => this.concluir()}
            title="Concluir Viagem"
            isSubmetendo={this.props.isSubmetendo}
            name="route"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({ viagem }) => {
  return {
    isLoading: viagem.isLoading,
    isSubmetendo: viagem.isSubmetendo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onConcluirViagem: viagem => dispatch(concluirViagem(viagem)),
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConcluirViagem);

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
});
