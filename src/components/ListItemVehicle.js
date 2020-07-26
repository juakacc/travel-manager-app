import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';

import commonStyles from '../commonStyles';
import { setMensagem } from '../store/actions/mensagem';

class ListItemVehicle extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.push('DetailVehicle', {
            vehicleId: item.id,
          });
        }}
      >
        <View style={styles.nomeMotorista}>
          <Text style={styles.txtNome}>{item.title}</Text>
        </View>

        <View style={styles.viewEdit}>
          <Icon
            name={'info-circle'}
            size={20}
            color={commonStyles.colors.secondary.main}
            style={styles.btnEdit}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(ListItemVehicle);

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
