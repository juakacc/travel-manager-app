import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import functions from '../functions';

import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    date: functions.getDateString(),
  };

  render() {
    const [nome] = this.props.nome ? this.props.nome.split(' ') : [''];

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.user}>Bem vindo, {nome}</Text>
          <Text style={styles.user}>{functions.getDateString()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    fontSize: 16,
  },
});

const mapStateToProps = ({ user }) => {
  return {
    nome: user.apelido,
  };
};

export default connect(mapStateToProps)(Header);
