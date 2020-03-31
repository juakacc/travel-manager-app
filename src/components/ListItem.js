import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';
import Modal from 'react-native-modal';
import Botao from './Botao';

import axios from 'axios';
import { connect } from 'react-redux';
import { setMensagem } from '../store/actions/mensagem';

class ListItem extends React.Component {
  state = {
    isVisible: false,
    infos: [],
  };

  editar = () => {
    this.props.navigation.navigate(this.props.editScreen, {
      itemId: this.props.item.id,
    });
  };

  mostrar = () => {
    const isPessoa = this.props.editScreen === 'CadastrarPessoa';

    if (isPessoa) {
      axios
        .get(`motoristas/${this.props.item.id}`)
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
        .get(`veiculos/${this.props.item.id}`)
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
    return (
      <View style={styles.container}>
        <View style={styles.nomeMotorista}>
          <Text style={styles.txtNome}>{this.props.item.title}</Text>
        </View>

        {this.props.isEdit ? (
          <View style={styles.viewEdit}>
            <TouchableOpacity onPress={this.editar} style={styles.btnEdit}>
              <Icon name="edit" size={20} color="yellow" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewEdit}>
            <TouchableOpacity onPress={this.mostrar} style={styles.btnEdit}>
              <Icon name="info-circle" size={20} color="yellow" />
            </TouchableOpacity>
          </View>
        )}

        <Modal isVisible={this.state.isVisible}>
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
              style={{ width: 100 }}
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
    backgroundColor: commonStyles.colors.secundaria,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  txtNome: {
    color: 'white',
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
