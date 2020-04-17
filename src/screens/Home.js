import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PTRView from 'react-native-pull-to-refresh';

import axios from 'axios';

import Header from '../components/Header';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import VeiculoAtual from '../components/VeiculoAtual';
import FormSelectVeiculo from '../components/FormSelectVeiculo';
import { connect } from 'react-redux';
import { setMensagem } from '../store/actions/mensagem';
import functions from '../functions';
import NumberFormat from 'react-number-format';

const textArray = [
  'NÃO ULTRAPASSE EM LUGAR INDEVIDO',
  'UTILIZE O CINTO DE SEGURANÇA',
  'LIGUE OS FARÓIS DO VEÍCULO',
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
    const textThatChanges = textArray[this.state.indice % textArray.length];

    const { viagem, veiculos, isLoading } = this.state;
    const { navigation } = this.props;

    return (
      <PTRView onRefresh={this.loadViagem}>
        <View style={styles.container}>
          <GeneralStatusBarColor
            backgroundColor={commonStyles.colors.secundaria}
            barStyle="ligth-content"
          />

          <Text style={styles.textoAviso}>
            Puxe <Icon name="arrow-down" /> para atualizar os veículos
            disponíveis
          </Text>
          <Header navigation={navigation} />
          <Text style={styles.textAlert}>{textThatChanges}</Text>

          <Spinner visible={isLoading} />

          {viagem ? (
            <VeiculoAtual viagem={viagem} navigation={navigation} />
          ) : (
            <FormSelectVeiculo navigation={navigation} veiculos={veiculos} />
          )}
          {viagem ? (
            <View style={styles.detalhesView}>
              <Text style={styles.txtDetalhes}>Detalhes da viagem</Text>

              <Text style={styles.infoTitle}>Momento da saída: </Text>
              <Text style={styles.infoValue}>
                {functions.getDateTimeString(viagem.saida)}
              </Text>

              <Text style={styles.infoTitle}>KM registrado na saída: </Text>
              <NumberFormat
                value={viagem.km_inicial}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => (
                  <Text style={styles.infoValue}>{value} KM</Text>
                )}
              />
            </View>
          ) : null}
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
  textoAviso: {
    alignSelf: 'center',
  },

  detalhesView: {
    padding: 10,
  },
  txtDetalhes: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoValue: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
});
