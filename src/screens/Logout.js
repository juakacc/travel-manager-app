import React from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import { userLoggout } from '../store/actions/user';

import Botao from '../components/Botao';
import commonStyles from '../commonStyles';

class Logout extends React.Component {
  state = {
    positionY: new Animated.Value(Dimensions.get('window').height),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(this.state.positionY, {
        toValue: 0,
        speed: 5,
        bounciness: 15,
      }),
    ]).start();
  }

  logout = () => {
    this.props.onLogout();
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
        <Text>Deseja realmente sair da aplicação? </Text>

        <Botao
          name="sign-out-alt"
          title="Sair"
          style={styles.button}
          color={commonStyles.colors.danger}
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
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(userLoggout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
