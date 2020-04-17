import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PTRView from 'react-native-pull-to-refresh';

import axios from 'axios';
import { connect } from 'react-redux';
import { setMensagem } from '../store/actions/mensagem';

import Header from '../components/Header';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import commonStyles from '../commonStyles';
import VeiculoAtual from '../components/VeiculoAtual';
import FormSelectVeiculo from '../components/FormSelectVeiculo';
import PullRefresh from '../components/PullRefresh';
import ViagemAtual from '../components/ViagemAtual';

const textArray = [
  'NÃO ULTRAPASSE EM LUGAR INDEVIDO',
  'UTILIZE O CINTO DE SEGURANÇA',
  'LIGUE OS FARÓIS DO VEÍCULO',
  'NÃO USE O CELULAR NO VOLANTE',
  'EVITE MULTAS',
];

class Home extends React.Component {
  _isMounted = false;

  state = {
    viagem: null,
    veiculos: [],
    isLoading: false,
    indice: 0,
  };

  componentDidMount() {
    this._isMounted = true;
    this.timeout = setInterval(() => {
      if (this._isMounted) {
        let indice = this.state.indice + 1;
        this.setState({ indice });
      }
    }, 5000);

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.loadViagem();
    });
  }

  loadViagem = async () => {
    this.setLoading(true);

    await axios
      .get(`viagens/atual/${this.props.motorista.id}`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            viagem: res.data,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({ viagem: null });
        }

        if (err.response && err.response.status !== 404) {
          this.props.set_mensagem(err);
          this.setLoading(false);
        } else {
          this.loadVeiculos();
        }
      });
  };

  loadVeiculos = async () => {
    await axios
      .get('veiculos/disponiveis')
      .then(res => {
        if (this._isMounted) {
          this.setState({
            veiculos: res.data,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        this.props.set_mensagem(err);
        this.setLoading(false);
      });
  };

  setLoading = isLoading => {
    if (this._isMounted) {
      this.setState({ isLoading });
    }
  };

  componentWillUnmount() {
    clearInterval(this.timeout);
    this._isMounted = false;
    this.focusListener.remove();
  }

  render() {
    const alerta = textArray[this.state.indice % textArray.length];

    const { viagem, veiculos, isLoading } = this.state;
    const { navigation } = this.props;

    return (
      <PTRView onRefresh={this.loadViagem}>
        <View style={styles.container}>
          <GeneralStatusBarColor
            backgroundColor={commonStyles.colors.secundaria}
            barStyle="ligth-content"
          />

          <PullRefresh />
          <Header />
          <Text style={styles.textAlert}>{alerta}</Text>

          <Spinner visible={isLoading} />

          {viagem ? (
            <VeiculoAtual viagem={viagem} navigation={navigation} />
          ) : (
            <FormSelectVeiculo navigation={navigation} veiculos={veiculos} />
          )}

          <ViagemAtual viagem={viagem} />
        </View>
      </PTRView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    motorista: user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  textAlert: {
    color: '#fff',
    backgroundColor: '#f00',
    padding: 10,
    margin: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
