import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Botao from './Botao';
import commonStyles from '../commonStyles';

export default class VeiculoAtual extends React.Component {
  concluirViagem = () => {
    this.props.navigation.navigate('ConcluirViagem', {
      viagemId: this.props.viagem.id,
    });
  };

  state = {
    positionX: new Animated.Value(Dimensions.get('screen').width),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(this.state.positionX, {
        toValue: 0,
        speed: 3,
        bounciness: 20,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veículo que está com você: </Text>

        <Animated.Text
          useNativeDriver
          style={[
            styles.veiculo,
            {
              transform: [
                {
                  translateX: this.state.positionX,
                },
              ],
            },
          ]}
        >
          <Icon name="car-side" size={20} color="white" />
          {` ${this.props.viagem.veiculo.nome}`}
        </Animated.Text>

        <Botao
          onPress={() => this.concluirViagem()}
          title="Entregar veículo"
          name="key"
          color={commonStyles.colors.gray.white}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.colors.secondary.main,
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  veiculo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: commonStyles.colors.gray.white,
  },
  txtInfo: {
    textAlign: 'center',
    color: commonStyles.colors.danger,
  },
});
