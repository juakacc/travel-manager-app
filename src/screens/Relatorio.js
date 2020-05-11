import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import UltimasViagens from '../components/UltimasViagens';
import Spinner from 'react-native-loading-spinner-overlay';

import Titulo from '../components/Titulo';
import FiltroData from '../components/FiltroData';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import commonStyles from '../commonStyles';

export default class Relatorio extends React.Component {
  state = {
    componentOk: false,
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />
        <View>
          {/* <Spinner visible={!this.state.componentOk} /> */}

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
