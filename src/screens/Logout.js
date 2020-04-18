import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

import { connect } from 'react-redux';
import { userLoggout } from '../store/actions/user';

import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Botao from '../components/Botao';
import commonStyles from '../commonStyles';

class Logout extends React.Component {
  state = {
    positionY: new Animated.Value(200),
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      Animated.spring(this.state.positionY, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }).start();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  logout = () => {
    this.props.onLogout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Animated.View
        useNativeDriver
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
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />
        <Text>Deseja realmente sair da aplicação? </Text>

        <Botao
          name="sign-out-alt"
          title="Sair"
          style={styles.button}
          onPress={() => this.logout()}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    alignItems: 'center',
    paddingVertical: 50,
  },
  button: {
    width: 100,
    color: 'white',
    backgroundColor: '#F54E2A',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(userLoggout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
