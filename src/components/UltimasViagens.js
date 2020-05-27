import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { connect } from 'react-redux';
import axios from 'axios';
import { setMensagem } from '../store/actions/mensagem';

import ItemViagemConcluida from './ItemViagemConcluida';
import SemResultado from './SemResultado';

class UltimasViagens extends React.Component {
  state = {
    viagens: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    this._focusListener = navigation.addListener('focus', () => {
      this.props.componentOk(false);
      axios
        .get('viagens?status=concluida')
        .then(res => {
          this.setState({ viagens: res.data });
          this.props.componentOk(true);
        })
        .catch(err => {
          this.props.set_mensagem(err);
          this.props.componentOk(true);
        });
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Últimas viagens finalizadas:</Text>

        <FlatList
          data={this.state.viagens}
          renderItem={({ item }) => (
            <ItemViagemConcluida
              viagem={item}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<SemResultado />}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(UltimasViagens);

const styles = StyleSheet.create({
  container: {
    height: 170,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
