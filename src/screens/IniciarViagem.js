import React from 'react';
import { connect } from 'react-redux';
import {
  Keyboard,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';

import { iniciarViagem } from '../store/actions/viagem';
import { setMensagem } from '../store/actions/mensagem';
import Botao from '../components/Botao';
import commonStyles from '../commonStyles';
import Titulo from '../components/Titulo';
import Loader from '../components/Loader';

class IniciarViagem extends React.Component {
  state = {
    quilometragem: 0,
    descricao: '',
    veiculoId: 0,
    isLoaded: false,

    veiculoNome: '',

    errQuilometragem: '',
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Viagem');
    }
  };

  isValid = () => {
    this.setState({
      errQuilometragem: '',
    });

    if (isNaN(this.state.quilometragem) || this.state.quilometragem <= 0) {
      this.setState({
        errQuilometragem: 'Insira uma quilometragem válida!',
        quilometragem: 0,
      });
      return false;
    }
    return true;
  };

  componentDidMount = () => {
    const { route } = this.props;
    const { idVeiculo: veiculoId } = route.params;

    if (!veiculoId) {
      this.props.setMensagem('Veículo inválido');
      this.props.navigation.navigate('SelecionarVeiculo');
    } else {
      this.setState({ veiculoId }, this.carregarVeiculo);
    }
  };

  carregarVeiculo = () => {
    this.setState({ isLoaded: false });
    axios
      .get(`veiculos/${this.state.veiculoId}`)
      .then(res => {
        this.setState({
          veiculoNome: res.data.nome,
          quilometragem: res.data.quilometragem,
          isLoaded: true,
        });
      })
      .catch(err => {
        this.setState({ isLoaded: true });
        this.props.setMensagem('Veículo inválido');
        this.props.navigation.navigate('Viagem');
        console.log(err);
      });
  };

  iniciarViagem = () => {
    if (this.isValid()) {
      const viagem = {
        descricao: this.state.descricao,
        km_inicial: this.state.quilometragem,
        veiculo: this.state.veiculoId,
      };
      this.props.onIniciarViagem(viagem);
    }
  };

  render() {
    const {
      isLoaded,
      veiculoNome,
      quilometragem,
      errQuilometragem,
      descricao,
    } = this.state;

    const { isSubmetendo } = this.props;

    const isLoading = !isLoaded || isSubmetendo;

    return isLoading ? (
      <Loader isLoading={isLoading} />
    ) : (
      isLoaded && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={styles.container}>
            <Titulo titulo="Iniciar Viagem" />

            <ScrollView>
              <Botao
                onPress={() => this.props.navigation.goBack()}
                title={veiculoNome}
                name="arrow-left"
              />

              <Text style={styles.title}>
                Qual a quilometragem atual registrada no veículo?
              </Text>
              <Text style={styles.title}>
                (Altere o valor prosposto para o valor marcado no painel do
                veículo)
              </Text>

              <Input
                keyboardType="numeric"
                label="Quilometragem *"
                placeholder="KM atual do veículo"
                value={`${quilometragem}`}
                errorMessage={errQuilometragem}
                returnKeyType="next"
                onSubmitEditing={() => this.input_02.focus()}
                blurOnSubmit={false}
                onChangeText={quilometragem => this.setState({ quilometragem })}
              />

              <Input
                label="Comentário (opcional)"
                value={descricao}
                placeholder="Comentário sobre a viagem"
                returnKeyType="done"
                ref={input => (this.input_02 = input)}
                onSubmitEditing={this.iniciarViagem}
                onChangeText={descricao => this.setState({ descricao })}
              />

              <Botao
                onPress={this.iniciarViagem}
                isSubmetendo={isSubmetendo}
                title="Iniciar viagem"
                name="route"
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
    );
  }
}

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

const mapStateToProps = ({ user, viagem }) => {
  return {
    motorista: user,
    isLoading: viagem.isLoading,
    isSubmetendo: viagem.isSubmetendo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIniciarViagem: viagem => dispatch(iniciarViagem(viagem)),
    setMensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IniciarViagem);
