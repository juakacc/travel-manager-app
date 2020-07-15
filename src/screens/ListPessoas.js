import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import ActionButton from '../components/ActionButton';
import ListItem from '../components/ListItem';
import Titulo from '../components/Titulo';
import Loader from '../components/Loader';
import { setMensagem } from '../store/actions/mensagem';
import commonStyles from '../commonStyles';

class ListPessoas extends React.Component {
  state = {
    motoristas: [],
    isLoading: false,
    buttonIsVisible: true,
  };
  _listViewOffset = 0;

  loadMotoristas = () => {
    this.setState({ isLoading: true });
    axios
      .get('motoristas')
      .then(res => {
        this.setState({
          motoristas: res.data,
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
      this.loadMotoristas();
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
        <Titulo titulo="Motoristas cadastrados" />

        <FlatList
          data={this.state.motoristas}
          renderItem={({ item }) => (
            <ListItem
              navigation={this.props.navigation}
              isEdit={this.props.isAdmin}
              editScreen="CadastrarPessoa"
              item={{ id: item.id, title: item.apelido }}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={
            <Text style={styles.semItens}>Nenhum item a ser exibido</Text>
          }
          onRefresh={() => this.loadMotoristas()}
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
            visible={this.state.buttonIsVisible}
            navigation={this.props.navigation}
            toScreen="CadastrarPessoa"
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPessoas);
