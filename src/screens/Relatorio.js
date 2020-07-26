import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import UltimasViagens from '../components/UltimasViagens';
import Titulo from '../components/Titulo';
import FiltroData from '../components/FiltroData';
import commonStyles from '../commonStyles';

export default class Relatorio extends React.Component {
  state = {
    componentOk: false,
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Titulo titulo="Relatórios" />

          <UltimasViagens
            navigation={this.props.navigation}
            componentOk={v => this.setState({ componentOk: v })}
          />
          <FiltroData navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
});
