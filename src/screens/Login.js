import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import { login } from '../store/actions/user';
import { setMensagem } from '../store/actions/mensagem';
import Loader from '../components/Loader';
import Botao from '../components/Botao';
import commonStyles from '../commonStyles';
import config from '../conf';

class Login extends React.Component {
  state = {
    apelido: '',
    senha: '',
    mostrar: true,
    positionY: new Animated.Value(Dimensions.get('window').height),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(this.state.positionY, {
        toValue: 0,
        bounciness: 20,
        useNativeDriver: true,
      }),
    ]).start();
  }

  isValid = () => {
    if (this.state.apelido.trim() === '') {
      this.props.set_mensagem('Preencha o apelido');
      return false;
    }
    if (this.state.senha.trim() === '') {
      this.props.set_mensagem('Preencha a senha');
      return false;
    }
    return true;
  };

  login = () => {
    if (this.isValid()) {
      this.props.onLogin({ ...this.state });
    }
  };

  esqueciSenha = () => {
    const msg = `Solicitação de nova senha para: ${this.state.apelido}`;
    Linking.openURL(`whatsapp://send?phone=${config.phone}&text=${msg}`);
  };

  mostrar = () => {
    this.setState({
      mostrar: !this.state.mostrar,
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    const { isSubmetendo } = this.props;

    return isSubmetendo ? (
      <Loader isLoading={isSubmetendo} />
    ) : (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: this.state.positionY,
                },
              ],
            },
          ]}
        >
          <KeyboardAvoidingView
            style={styles.center}
            behavior={Platform.select({
              ios: 'padding',
              android: null,
            })}
          >
            <Text style={styles.titulo}>
              <Icon
                name="road"
                size={35}
                color={commonStyles.colors.secondary.main}
              />{' '}
              Viagens PMO
            </Text>

            <View style={styles.inputContainer}>
              <Icon
                style={styles.inputIcon}
                name="user-alt"
                size={20}
                color={commonStyles.colors.gray.white}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Apelido"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.apelido}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.input_2.focus();
                }}
                blurOnSubmit={false}
                underlineColorAndroid="transparent"
                onChangeText={apelido => this.setState({ apelido: apelido })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                style={styles.inputIcon}
                name="user-lock"
                size={20}
                color={commonStyles.colors.gray.white}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={this.state.mostrar}
                value={this.state.senha}
                returnKeyType="done"
                ref={input => {
                  this.input_2 = input;
                }}
                onSubmitEditing={this.login}
                underlineColorAndroid="transparent"
                onChangeText={senha => this.setState({ senha })}
              />

              <TouchableOpacity onPress={this.mostrar} style={styles.eye}>
                <Icon
                  name={this.state.mostrar ? 'eye' : 'eye-slash'}
                  size={20}
                  color={commonStyles.colors.gray.white}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={this.esqueciSenha}>
              <Text style={styles.esqueci}>Esqueci a senha</Text>
            </TouchableOpacity>

            <Botao
              style={styles.buttonContainer}
              title="Entrar"
              // isSubmetendo={this.props.isSubmetendo}
              onPress={() => this.login()}
              name="sign-in-alt"
            />

            <Text>Versão: {config.version}</Text>
          </KeyboardAvoidingView>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    padding: 10,
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  esqueci: {
    color: 'blue',
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: '#aa5500cc',
    borderRadius: 15,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    textAlignVertical: 'center',
  },
  eye: {
    marginHorizontal: 10,
  },
  buttonContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user)),
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading,
    isSubmetendo: user.isSubmetendo,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
