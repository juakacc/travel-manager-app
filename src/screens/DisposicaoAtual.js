import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Header from '../components/Header';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import commonStyles from '../commonStyles';
import ItemViagemConcluida from '../components/ItemViagemConcluida';
import SemResultado from '../components/SemResultado';

import axios from 'axios';
import { setMensagem } from '../store/actions/mensagem';
import { connect } from 'react-redux';
import Titulo from '../components/Titulo';

class DisposicaoAtual extends React.Component {
  _isMounted = false;

  state = {
    viagens: [],
    isLoading: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.carregarViagens();
    });
  }

  carregarViagens = () => {
    this.setState({ isLoading: true });
    axios
      .get('viagens?status=nao-concluida')
      .then(res => {
        if (this._isMounted) {
          this.setState({
            viagens: res.data,
            isLoading: false,
          });
        }
        // this.setState({ isLoading: false })
      })
      .catch(err => {
        this.props.set_mensagem(err);
        if (this._isMounted) {
          this.setState({ isLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />

        <Header navigation={this.props.navigation} />
        <Titulo titulo="Viagens em andamento" />

        <Spinner visible={this.state.isLoading} />

        <FlatList
          data={this.state.viagens}
          renderItem={({ item }) => (
            <ItemViagemConcluida
              viagem={item}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={
            <TouchableOpacity onPress={this.carregarViagens}>
              <View>
                <SemResultado />
                <Text>Toque para atualizar</Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(DisposicaoAtual);

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  textAlert: {
    color: '#fff',
    backgroundColor: '#f00',
    padding: 5,
    margin: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  title: {
    color: '#000',
    fontFamily: 'shelter',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  motorista: {
    fontSize: 14,
    textAlign: 'center',
  },
  veiculo: {
    color: '#777',
    fontSize: 11,
    textAlign: 'center',
  },
  txtSemViagem: {
    marginTop: 10,
    textAlign: 'center',
  },
});
