import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import axios from 'axios';
import { connect } from 'react-redux';

import Botao from './Botao';
import commonStyles from '../commonStyles';
import { setMensagem } from '../store/actions/mensagem';

class ListItem extends React.Component {
  state = {
    isVisible: false,
    infos: [],
  };

  editar = () => {
    const { editScreen, item, navigation } = this.props;

    navigation.push(editScreen, {
      itemId: item.id,
    });
  };

  mostrar = () => {
    const { editScreen, item } = this.props;
    const isPessoa = editScreen === 'CadastrarPessoa';

    if (isPessoa) {
      axios
        .get(`motoristas/${item.id}`)
        .then(motorista => {
          this.setState({
            isVisible: true,
            infos: [
              {
                id: 1,
                titulo: 'Nome: ',
                valor: motorista.data.nome,
              },
              {
                id: 2,
                titulo: 'CNH: ',
                valor: motorista.data.cnh,
              },
              {
                id: 3,
                titulo: 'Categoria: ',
                valor: motorista.data.categoria,
              },
              {
                id: 4,
                titulo: 'Telefone: ',
                valor: motorista.data.telefone,
              },
            ],
          });
        })
        .catch(err => {
          this.props.set_mensagem(err);
          this.closeModal();
        });
    } else {
      axios
        .get(`veiculos/${item.id}`)
        .then(veiculo => {
          this.setState({
            isVisible: true,
            infos: [
              {
                id: 1,
                titulo: 'Nome: ',
                valor: veiculo.data.nome,
              },
              {
                id: 5,
                titulo: 'Marca: ',
                valor: veiculo.data.marca,
              },
              {
                id: 2,
                titulo: 'Placa: ',
                valor: veiculo.data.placa,
              },
              {
                id: 3,
                titulo: 'Renavam: ',
                valor: veiculo.data.renavam,
              },
              {
                id: 4,
                titulo: 'Quilometragem: ',
                valor: `${veiculo.data.quilometragem} KM`,
              },
            ],
          });
        })
        .catch(err => {
          this.props.set_mensagem(err);
          this.closeModal();
        });
    }
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { isEdit, item } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.nomeMotorista}>
          <Text style={styles.txtNome}>{item.title}</Text>
        </View>

        <View style={styles.viewEdit}>
          <TouchableOpacity
            onPress={isEdit ? this.editar : this.mostrar}
            style={styles.btnEdit}
          >
            <Icon
              name={isEdit ? 'edit' : 'info-circle'}
              size={20}
              color={commonStyles.colors.secondary.main}
            />
          </TouchableOpacity>
        </View>

        <Modal
          isVisible={this.state.isVisible}
          backdropColor={commonStyles.colors.secondary.main}
        >
          <View style={styles.modalContainer}>
            {this.state.infos.map(item => {
              return (
                <View key={item.id} style={styles.infoView}>
                  <Text style={styles.infoTitulo}>{item.titulo}</Text>
                  <Text style={styles.infoValor}>{item.valor}</Text>
                </View>
              );
            })}
            <Botao
              title="Esconder"
              onPress={this.closeModal}
              style={{ width: 200 }}
              name="minus-circle"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(ListItem);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: commonStyles.colors.secondary.main,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  txtNome: {
    color: commonStyles.colors.secondary.main,
    fontSize: 20,
  },
  nomeMotorista: {
    flex: 2,
  },
  viewEdit: {
    flex: 1,
  },
  btnEdit: {
    padding: 20,
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  infoTitulo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoValor: {
    color: 'white',
    fontSize: 16,
  },
});
