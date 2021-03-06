import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import Titulo from '../components/Titulo';
import { setMensagem } from '../store/actions/mensagem';
import ActionButton from '../components/ActionButton';
import Loader from '../components/Loader';
import commonStyles from '../commonStyles';
import ListItemVehicle from '../components/ListItemVehicle';

class ListVeiculos extends React.Component {
  state = {
    veiculos: [],
    isLoading: false,
    buttonIsVisible: true,
  };

  _listViewOffset = 0;

  loadVeiculos = () => {
    this.setState({ isLoading: true });
    axios
      .get('veiculos')
      .then(res => {
        this.setState({
          veiculos: res.data,
          isLoading: false,
        });
      })
      .catch(err => {
        this.props.set_mensagem(err);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.loadVeiculos();
    });
  }

  componentWillUnmount() {
    this._focusListener();
  }

  render() {
    const { isLoading } = this.state;

    return isLoading ? (
      <Loader isLoading={isLoading} />
    ) : (
      <SafeAreaView style={styles.container}>
        <Titulo titulo="Veículos cadastrados" />

        <FlatList
          data={this.state.veiculos}
          renderItem={({ item }) => (
            <ListItemVehicle
              navigation={this.props.navigation}
              isEdit={this.props.isAdmin}
              editScreen="CadastrarVeiculo"
              item={{ id: item.id, title: item.nome }}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={
            <Text style={styles.semItens}>Nenhum item a ser exibido</Text>
          }
          onRefresh={() => this.loadVeiculos()}
          refreshing={isLoading}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            const currentOffset = event.nativeEvent.contentOffset.y;
            const direction =
              currentOffset > 0 && currentOffset > this._listViewOffset
                ? 'down'
                : 'up';
            const buttonIsVisible = direction === 'up';

            if (buttonIsVisible !== this.state.buttonIsVisible) {
              this.setState({ buttonIsVisible });
            }
            this._listViewOffset = currentOffset;
          }}
        />

        {this.props.isAdmin && (
          <ActionButton
            icon="plus"
            visible={this.state.buttonIsVisible}
            navigation={this.props.navigation}
            toScreen="CadastrarVeiculo"
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  semItens: {
    margin: 20,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ user }) => {
  return {
    isAdmin: user.permissoes.includes('admin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListVeiculos);
