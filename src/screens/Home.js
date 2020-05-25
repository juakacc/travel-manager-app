import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PTRView from 'react-native-pull-to-refresh';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FloatingAction } from 'react-native-floating-action';

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
import ShowRevisoes from '../components/ShowRevisoes';

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
    revisoes: [],
    veiculos: [],
    isLoading: false,
    indice_msg: 0,

    fadeIn: new Animated.Value(0),
    fabOpen: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this.animar();

    this.timeout = setInterval(() => {
      if (this._isMounted) {
        let indice_msg = this.state.indice_msg + 1;
        this.setState({ indice_msg });
      }
    }, 5000);

    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.loadViagem();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.motorista.id !== this.props.motorista.id) {
      this.loadViagem();
    }
  }

  animar = () => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.state.fadeIn, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  };

  loadViagem = () => {
    this.setLoading(true);
    axios
      .get(`viagens/atual/${this.props.motorista.id}`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            viagem: res.data,
          });
        }
        this.loadRevisoes(res.data.veiculo);
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({ viagem: null });
        }

        if (err.response && err.response.status === 404) {
          // Não encontrou viagem
          this.loadVeiculos();
        } else {
          this.props.set_mensagem(err);
          this.setLoading(false);
        }
      });
  };

  loadVeiculos = () => {
    axios
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

  loadRevisoes = veiculo => {
    axios
      .get(`veiculos/${veiculo.id}/revisoes`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            revisoes: res.data,
            isLoading: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
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
    this._focusListener();
  }

  fabPressed = name => {
    const { viagem } = this.state;

    switch (name) {
      case 'bt_service':
        this.props.navigation.navigate('RegisterService', {
          veiculo: viagem?.veiculo,
          isAdmin: this.props.motorista.permissoes.includes('admin'),
        });
        break;
      case 'bt_fuel':
        this.props.navigation.navigate('RegisterSupply', {
          veiculo: viagem?.veiculo,
          isAdmin: this.props.motorista.permissoes.includes('admin'),
        });
        break;
    }
  };

  render() {
    const {
      viagem,
      veiculos,
      isLoading,
      indice_msg,
      fabOpen,
      revisoes,
    } = this.state;
    const { navigation, motorista } = this.props;
    const alerta = textArray[indice_msg % textArray.length];

    const actions = [
      {
        text: 'Abastecimento',
        icon: (
          <Icon
            name="gas-pump"
            size={20}
            color={commonStyles.colors.secondary.main}
          />
        ),
        name: 'bt_fuel',
        color: commonStyles.colors.primary.main,
      },
      {
        text: 'Serviço',
        icon: (
          <Icon
            name="wrench"
            size={20}
            color={commonStyles.colors.secondary.main}
          />
        ),
        name: 'bt_service',
        color: commonStyles.colors.primary.main,
      },
    ];

    const icon = (
      <Icon
        name="plus"
        color={commonStyles.colors.secondary.main}
        size={20}
        style={fabOpen ? { transform: [{ rotate: '45deg' }] } : {}}
      />
    );

    return (
      <>
        <Spinner visible={isLoading} />
        {!isLoading && (
          <View style={styles.container}>
            <PTRView onRefresh={this.loadViagem}>
              <GeneralStatusBarColor
                backgroundColor={commonStyles.colors.secondary.main}
                barStyle="ligth-content"
              />
              <PullRefresh />
              {/* <Header /> */}
              <Animated.Text
                useNativeDriver
                style={[
                  styles.textAlert,
                  {
                    opacity: this.state.fadeIn,
                  },
                ]}
              >
                {alerta}
              </Animated.Text>

              {viagem && revisoes.length > 0 && (
                <ShowRevisoes
                  revisoes={revisoes}
                  veiculo={viagem.veiculo}
                  navigation={navigation}
                />
              )}

              {viagem ? (
                <VeiculoAtual viagem={viagem} navigation={navigation} />
              ) : (
                <FormSelectVeiculo
                  navigation={navigation}
                  veiculos={veiculos}
                />
              )}
              <ViagemAtual viagem={viagem} />
            </PTRView>

            {(viagem?.veiculo || motorista.permissoes.includes('admin')) && (
              <FloatingAction
                actions={actions}
                onPressItem={this.fabPressed}
                floatingIcon={icon}
                onOpen={() => this.setState({ fabOpen: true })}
                onClose={() => this.setState({ fabOpen: false })}
                overlayColor={'rgba(170, 85, 0, 0.5)'}
                color={commonStyles.colors.primary.main}
              />
            )}
          </View>
        )}
      </>
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
    color: commonStyles.colors.gray.white,
    backgroundColor: commonStyles.colors.danger,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
