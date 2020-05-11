import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

import { salvar_usuario, editar_usuario } from '../store/actions/user';
import { setMensagem } from '../store/actions/mensagem';
import { connect } from 'react-redux';
import axios from 'axios';

import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import Botao from '../components/Botao';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

const estadoInicial = {
  nome: '',
  apelido: '',
  cnh: '',
  categoria: 'A',
  telefone: '',
  senha: '',
  confirm_senha: '',
  admin: false,

  isEdit: false,
  motoristaId: 0,
  isLoading: false,

  err_nome: '',
  err_apelido: '',
  err_cnh: '',
  err_categoria: '',
  err_telefone: '',
  err_senha: '',
  err_confirm_senha: '',
};

class CadastrarPessoa extends React.Component {
  constructor(props) {
    super(props);
    this.state = estadoInicial;
  }

  componentDidMount = () => {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      const { editThis, itemId } = this.props.route.params;

      const motoristaId = editThis ? this.props.motorista.id : itemId;

      if (motoristaId) {
        this.setState({ isLoading: true });
        axios
          .get(`motoristas/${motoristaId}`)
          .then(res => {
            const { nome, apelido, cnh, categoria, telefone } = res.data;

            this.setState({
              nome,
              apelido,
              cnh,
              categoria,
              telefone,
              isEdit: true,
              motoristaId,
              isLoading: false,
            });
          })
          .catch(err => {
            this.props.set_mensagem(err);
            this.setState({ isLoading: false });
          });
      }
    });
  };

  componentWillUnmount = () => {
    this._focusListener();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      // @VALIDAR
      this.props.navigation.goBack();
      // if (this.props.route.params.editThis) {
      //   this.props.navigation.navigate('Home');
      // } else {
      //   this.props.navigation.navigate('PessoasScreen');
      // }
    }
  };

  isValid = () => {
    let valid = true;
    this.setState({
      err_nome: '',
      err_apelido: '',
      err_cnh: '',
      err_categoria: '',
      err_telefone: '',
      err_senha: '',
      err_confirm_senha: '',
    });

    if (this.state.nome.trim() === '') {
      this.setState({ err_nome: 'Digite um nome válido' });
      valid = false;
    }
    if (this.state.apelido.trim() === '') {
      this.setState({ err_apelido: 'Digite um apelido válido' });
      valid = false;
    }
    if (this.state.cnh.trim() === '') {
      this.setState({ err_cnh: 'Digite uma CNH válida' });
      valid = false;
    }
    if (this.state.categoria.trim() === '') {
      this.setState({ err_categoria: 'Escolha uma categoria válida' });
      valid = false;
    }
    if (this.state.telefone.trim() === '') {
      this.setState({ err_telefone: 'Digite um telefone válido' });
      valid = false;
    }
    if (!this.state.isEdit) {
      if (this.state.senha.trim().length < 6) {
        this.setState({
          err_senha: 'A senha deve conter no mínimo 6 caracteres',
          senha: '',
          confirm_senha: '',
        });
        valid = false;
      }
      if (this.state.confirm_senha !== this.state.senha) {
        this.setState({
          err_confirm_senha: 'A senhas não correspondem',
          senha: '',
          confirm_senha: '',
        });
        valid = false;
      }
    }
    return valid;
  };

  salvar = () => {
    if (this.isValid()) {
      const permissoes = {
        motorista: true,
      };
      if (this.state.admin) {
        permissoes.admin = true;
      }
      const usuario = {
        nome: this.state.nome,
        apelido: this.state.apelido.toLowerCase().trim(),
        cnh: this.state.cnh,
        categoria: this.state.categoria,
        telefone: this.state.telefone,
        permissoes,
        senha: this.state.senha,
      };
      if (this.state.isEdit) {
        usuario.id = this.state.motoristaId;
        this.props.onEditar(usuario);
      } else {
        this.props.onSalvar(usuario);
      }
    }
  };

  render() {
    const titulo = this.state.isEdit
      ? 'Edição de Pessoa'
      : 'Cadastro de Pessoa';

    const { isEdit } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <GeneralStatusBarColor
            backgroundColor={commonStyles.colors.secundaria}
            barStyle="ligth-content"
          />
          <Spinner visible={this.props.isSubmetendo || this.state.isLoading} />

          <Titulo titulo={titulo} />

          <ScrollView>
            <Input
              label="Nome *"
              value={this.state.nome}
              errorMessage={this.state.err_nome}
              returnKeyType="next"
              onSubmitEditing={() => this.apelido.focus()}
              blurOnSubmit={false}
              onChangeText={nome => this.setState({ nome })}
              autoFocus
            />

            <Input
              label="Apelido *"
              value={this.state.apelido}
              errorMessage={this.state.err_apelido}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              ref={input => (this.apelido = input)}
              onSubmitEditing={() => this.cnh.focus()}
              blurOnSubmit={false}
              onChangeText={apelido => this.setState({ apelido })}
            />

            <Input
              label="CNH *"
              value={this.state.cnh}
              errorMessage={this.state.err_cnh}
              returnKeyType="next"
              ref={input => (this.cnh = input)}
              onSubmitEditing={() => this.telefone.focus()}
              blurOnSubmit={false}
              onChangeText={cnh => this.setState({ cnh })}
            />

            <Text style={styles.txtCategoria}>Categoria *</Text>
            <Picker
              selectedValue={this.state.categoria}
              onValueChange={categoria => this.setState({ categoria })}
            >
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="E" value="E" />
              <Picker.Item label="AB" value="AB" />
              <Picker.Item label="AC" value="AC" />
              <Picker.Item label="AD" value="AD" />
              <Picker.Item label="AE" value="AE" />
            </Picker>

            <Input
              label="Telefone *"
              value={this.state.telefone}
              errorMessage={this.state.err_telefone}
              keyboardType="numeric"
              returnKeyType={isEdit ? 'done' : 'next'}
              ref={input => (this.telefone = input)}
              onSubmitEditing={() =>
                isEdit ? this.salvar() : this.senha.focus()
              }
              blurOnSubmit={false}
              onChangeText={telefone => this.setState({ telefone })}
            />

            {!isEdit && (
              <View>
                <CheckBox
                  title="É administrador?"
                  checked={this.state.admin}
                  onPress={() => this.setState({ admin: !this.state.admin })}
                />

                <Input
                  label="Senha *"
                  value={this.state.senha}
                  errorMessage={this.state.err_senha}
                  returnKeyType="next"
                  ref={input => (this.senha = input)}
                  onSubmitEditing={() => this.confirmSenha.focus()}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  onChangeText={senha => this.setState({ senha })}
                />

                <Input
                  label="Confirmar senha *"
                  value={`${this.state.confirm_senha}`}
                  secureTextEntry={true}
                  errorMessage={this.state.err_confirm_senha}
                  returnKeyType="done"
                  ref={input => (this.confirmSenha = input)}
                  onSubmitEditing={this.salvar}
                  onChangeText={confirm_senha =>
                    this.setState({ confirm_senha })
                  }
                />
              </View>
            )}

            <Botao
              onPress={() => this.salvar()}
              title="Salvar"
              name="save"
              isSubmetendo={this.props.isSubmetendo}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  txtCategoria: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 15,
  },
});

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading,
    isSubmetendo: user.isSubmetendo,
    motorista: user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSalvar: user => dispatch(salvar_usuario(user)),
    onEditar: user => dispatch(editar_usuario(user)),
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarPessoa);
