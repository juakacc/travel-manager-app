import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import axios from 'axios';
import { connect } from 'react-redux';
import { setMensagem } from '../store/actions/mensagem';
import commonStyles from '../commonStyles';
import functions from '../functions';
import Titulo from '../components/Titulo';

import NumberFormat from 'react-number-format';
import Spinner from 'react-native-loading-spinner-overlay';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';

class DetalharViagem extends React.Component {
  state = {
    viagem: {
      id: 0,
      chegada: '',
      descricao: '',
      km_final: 0,
      km_inicial: 0,
      motorista: {
        nome: '',
      },
      saida: '',
      veiculo: {
        nome: '',
      },
    },
    isLoading: true,

    fade: new Animated.Value(-100),
  };

  componentDidMount = async () => {
    const { idViagem } = this.props.route.params;

    if (idViagem) {
      // this.setState({ isLoading: true });
      await axios
        .get(`viagens/${idViagem}`)
        .then(res => {
          this.setState({
            viagem: res.data,
            isLoading: false,
          });
        })
        .catch(err => {
          this.props.setMensagem(err);
          this.setState({ isLoading: false });
        });
    } else {
      this.props.navigation.goBack();
    }

    Animated.loop(
      Animated.timing(this.state.fade, {
        toValue: Dimensions.get('window').width,
        duration: 4000,
      }),
    ).start();
  };

  render() {
    const { viagem, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secondary.main}
          barStyle="ligth-content"
        />
        <Spinner visible={isLoading} />

        <Titulo titulo={`Detalhes da Viagem #${viagem.id}`} />

        <Text style={styles.infoTitle}>Motorista: </Text>
        <Text style={styles.infoValue}>{viagem.motorista.nome}</Text>

        <Text style={styles.infoTitle}>Veículo: </Text>
        <Text style={styles.infoValue}>{viagem.veiculo.nome}</Text>

        {viagem.descricao ? (
          <View>
            <Text style={styles.infoTitle}>Descrição sobre a viagem: </Text>
            <Text style={styles.infoValue}>{viagem.descricao}</Text>
          </View>
        ) : null}

        <Text style={styles.infoTitle}>Momento da saída: </Text>
        <Text style={styles.infoValue}>
          {functions.getDateTimeString(viagem.saida)}
        </Text>

        <Text style={styles.infoTitle}>KM registrado na saída: </Text>
        <NumberFormat
          value={viagem.km_inicial}
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => <Text style={styles.infoValue}>{value} KM</Text>}
        />

        {viagem.chegada ? (
          <View>
            <Text style={styles.infoTitle}>Momento da chegada: </Text>
            <Text style={styles.infoValue}>
              {functions.getDateTimeString(viagem.chegada)}
            </Text>

            <Text style={styles.infoTitle}>KM registrado na chegada: </Text>
            <NumberFormat
              value={viagem.km_final}
              displayType={'text'}
              thousandSeparator={true}
              renderText={value => (
                <Text style={styles.infoValue}>{value} KM</Text>
              )}
            />
          </View>
        ) : (
          <Animated.View
            useNativeDriver
            style={[
              styles.viewAnimated,
              {
                transform: [
                  {
                    translateX: this.state.fade,
                  },
                ],
              },
            ]}
          >
            <Icon
              name="car-side"
              size={50}
              color={commonStyles.colors.secondary.main}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    paddingHorizontal: 10,
  },
  info: {
    marginLeft: 10,
    marginVertical: 10,
  },
  viewAnimated: {
    marginTop: 50,
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

const mapStateToProps = ({ user }) => {
  return {
    token: user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalharViagem);
