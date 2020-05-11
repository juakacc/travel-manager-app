import React from 'react';
import {
  Text,
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

import { salvar_veiculo, editar_veiculo } from '../store/actions/veiculo';
import { setMensagem } from '../store/actions/mensagem';
import { connect } from 'react-redux';
import axios from 'axios';

import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';

class CadastrarVeiculo extends React.Component {
  state = {
    nome: '',
    placa: '',
    renavam: '',
    marca: '',
    modelo: '',
    quilometragem: '',
    cnh_requerida: 'A',

    isEdit: false,
    veiculoId: 0,
    isLoading: false,

    err_nome: '',
    err_placa: '',
    err_renavam: '',
    err_marca: '',
    err_modelo: '',
    err_quilometragem: '',
    err_cnh_requerida: '',
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('VeiculosScreen');
    }
  };

  componentDidMount = () => {
    const { itemId: veiculoId } = this.props.route.params;

    if (veiculoId) {
      this.setState({ isLoading: true });
      axios
        .get(`veiculos/${veiculoId}`)
        .then(res => {
          const {
            nome,
            placa,
            renavam,
            marca,
            modelo,
            quilometragem,
            cnh_requerida,
          } = res.data;

          this.setState({
            nome,
            placa,
            renavam,
            marca,
            modelo,
            quilometragem,
            cnh_requerida,
            isEdit: true,
            veiculoId,
            isLoading: false,
          });
        })
        .catch(err => {
          this.props.set_mensagem(err);
          this.setState({ isLoading: false });
        });
    }
  };

  isValid = () => {
    let valid = true;
    this.setState({
      err_nome: '',
      err_placa: '',
      err_renavam: '',
      err_marca: '',
      err_modelo: '',
      err_quilometragem: '',
      err_cnh_requerida: '',
    });

    if (this.state.nome.trim() === '') {
      this.setState({ err_nome: 'Digite um nome válido' });
      valid = false;
    }

    if (this.state.placa.trim() === '') {
      this.setState({ err_placa: 'Digite uma placa válida' });
      valid = false;
    }

    if (this.state.renavam.trim() === '') {
      this.setState({ err_renavam: 'Digite um renavam válido' });
      valid = false;
    }

    if (this.state.marca.trim() === '') {
      this.setState({ err_marca: 'Digite uma marca válida' });
      valid = false;
    }

    if (this.state.modelo.trim() === '') {
      this.setState({ err_modelo: 'Digite um modelo válido' });
      valid = false;
    }

    if (this.state.quilometragem !== '') {
      if (isNaN(this.state.quilometragem) || this.state.quilometragem < 0) {
        this.setState({ err_quilometragem: 'Digite uma quilometragem válida' });
        valid = false;
      }
    }

    if (this.state.cnh_requerida.trim() === '') {
      this.setState({ err_cnh_requerida: 'Escolha uma CNH válida' });
      valid = false;
    }
    return valid;
  };

  salvarVeiculo = () => {
    if (this.isValid()) {
      const veiculo = {
        nome: this.state.nome.toUpperCase(),
        placa: this.state.placa.toUpperCase(),
        renavam: this.state.renavam,
        marca: this.state.marca,
        modelo: this.state.modelo,
        quilometragem: this.state.quilometragem,
        cnh_requerida: this.state.cnh_requerida,
      };
      if (this.state.isEdit) {
        veiculo.id = this.state.veiculoId;
        this.props.onEditarVeiculo(veiculo);
      } else {
        this.props.onSalvarVeiculo(veiculo);
      }
    }
  };

  setKM = quilometragem => {
    if (quilometragem === '' || /^\d+$/.test(quilometragem)) {
      this.setState({ quilometragem });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />
        <Spinner visible={this.props.isSubmetendo || this.state.isLoading} />

        <Titulo titulo="Cadastro de Veículo" />

        <ScrollView>
          <Input
            label="Nome *"
            value={this.state.nome}
            errorMessage={this.state.err_nome}
            returnKeyType="next"
            onSubmitEditing={() => this.placa.focus()}
            blurOnSubmit={false}
            onChangeText={nome => this.setState({ nome })}
            autoFocus
          />

          <Input
            label="Placa *"
            value={this.state.placa}
            errorMessage={this.state.err_placa}
            returnKeyType="next"
            ref={input => (this.placa = input)}
            onSubmitEditing={() => this.renavam.focus()}
            blurOnSubmit={false}
            onChangeText={placa => this.setState({ placa })}
          />

          <Input
            label="Renavam *"
            value={this.state.renavam}
            errorMessage={this.state.err_renavam}
            returnKeyType="next"
            ref={input => (this.renavam = input)}
            onSubmitEditing={() => this.marca.focus()}
            blurOnSubmit={false}
            onChangeText={renavam => this.setState({ renavam })}
          />

          <Input
            label="Marca *"
            value={this.state.marca}
            errorMessage={this.state.err_marca}
            returnKeyType="next"
            ref={input => (this.marca = input)}
            onSubmitEditing={() => this.modelo.focus()}
            blurOnSubmit={false}
            onChangeText={marca => this.setState({ marca })}
          />

          <Input
            label="Modelo *"
            value={this.state.modelo}
            errorMessage={this.state.err_modelo}
            returnKeyType="next"
            ref={input => (this.modelo = input)}
            onSubmitEditing={() => this.quilometragem.focus()}
            blurOnSubmit={false}
            onChangeText={modelo => this.setState({ modelo })}
          />

          <Text style={styles.labelCnh}>CNH Requerida *</Text>
          <Picker
            selectedValue={this.state.cnh_requerida}
            onValueChange={cnh_requerida => this.setState({ cnh_requerida })}
          >
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="C" value="C" />
            <Picker.Item label="D" value="D" />
            <Picker.Item label="E" value="E" />
          </Picker>

          <Input
            label="Quilometragem"
            value={`${this.state.quilometragem}`}
            errorMessage={this.state.err_quilometragem}
            keyboardType="numeric"
            returnKeyType="done"
            ref={input => (this.quilometragem = input)}
            onSubmitEditing={this.salvarVeiculo}
            onChangeText={q => this.setKM(q)}
          />

          <Botao
            onPress={() => this.salvarVeiculo()}
            title="Salvar"
            name="save"
            isSubmetendo={this.props.isSubmetendo}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  labelCnh: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 15,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onSalvarVeiculo: veiculo => dispatch(salvar_veiculo(veiculo)),
    onEditarVeiculo: veiculo => dispatch(editar_veiculo(veiculo)),
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

const mapStateToProps = ({ veiculo }) => {
  return {
    isLoading: veiculo.isLoading,
    isSubmetendo: veiculo.isSubmetendo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarVeiculo);
