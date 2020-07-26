import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import commonStyles from '../commonStyles';
import { setMensagem } from '../store/actions/mensagem';
import ItemViagemConcluida from '../components/ItemViagemConcluida';
import SemResultado from '../components/SemResultado';
import Titulo from '../components/Titulo';
import PullRefresh from '../components/PullRefresh';
import Loader from '../components/Loader';

class DisposicaoAtual extends React.Component {
  _isMounted = false;

  state = {
    viagens: [],
    isLoading: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this._focusListener = this.props.navigation.addListener('focus', () => {
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
      })
      .catch(err => {
        this.props.set_mensagem(err);
        if (this._isMounted) {
          this.setState({ isLoading: false });
        }
      });
  };

  componentWillUnmount() {
    this._focusListener();
    this._isMounted = false;
  }

  render() {
    const { isLoading, viagens } = this.state;

    return isLoading ? (
      <Loader isLoading={isLoading} />
    ) : (
      <>
        <View style={styles.container}>
          <PullRefresh />
          <Titulo titulo="Viagens em andamento" />

          <FlatList
            data={viagens}
            renderItem={({ item }) => (
              <ItemViagemConcluida
                viagem={item}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => `${item.id}`}
            onRefresh={() => this.carregarViagens()}
            refreshing={isLoading}
            ListEmptyComponent={
              <TouchableOpacity onPress={this.carregarViagens}>
                <View style={styles.viewSemResultado}>
                  <SemResultado />
                  <Text>Toque para atualizar</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

const mapStateToProps = ({ user }) => {
  return {
    motorista: user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisposicaoAtual);

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  textAlert: {
    color: commonStyles.colors.gray.white,
    backgroundColor: commonStyles.colors.danger,
    padding: 5,
    margin: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    color: commonStyles.colors.gray.black,
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
    color: commonStyles.colors.gray.main,
    fontSize: 11,
    textAlign: 'center',
  },
  txtSemViagem: {
    marginTop: 10,
    textAlign: 'center',
  },
  viewSemResultado: {
    alignItems: 'center',
  },
});
