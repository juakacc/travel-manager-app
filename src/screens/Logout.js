import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Botao from '../components/Botao';

import { connect } from 'react-redux';
import { userLoggout } from '../store/actions/user';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import commonStyles from '../commonStyles';

class Logout extends React.Component {
  logout = () => {
    this.props.onLogout();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
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
      </View>
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
