import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';

import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import Botao from '../components/Botao';

export default function RegisterSupply({ navigation }) {
  const [veiculo, setVeiculo] = useState(() => {
    return navigation.getParam('veiculo');
  });

  const [km, setKm] = useState(() => {
    return veiculo.quilometragem;
  });
  const [litros, setLitros] = useState(0);
  const [tipo, setTipo] = useState('gasolina');

  const [kmError, setKmError] = useState('');
  const [ltError, setLtError] = useState('');

  const litrosTxt = useRef(null);

  const isValid = () => {
    setKmError('');
    setLtError('');
    let valid = true;

    if (isNaN(km)) {
      setKmError('Quilometragem inválida');
      valid = false;
    }
    if (isNaN(litros)) {
      setLtError('Litragem inválida');
      valid = false;
    }
    return valid;
  };

  const save = () => {
    if (isValid()) {
      const event = {
        km,
        litros,
        tipo,
        id: veiculo.id,
      };
      Alert.alert('Saving data');
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />
        <Titulo titulo="Cadastro de abastecimento" />

        <Text style={styles.txtVeiculo}>
          Veículo: <Text style={styles.veiculo}>{veiculo.nome}</Text>
        </Text>

        <Input
          keyboardType="numeric"
          label="Quilometragem *"
          value={`${km}`}
          errorMessage={kmError}
          returnKeyType="next"
          onSubmitEditing={() => litrosTxt.current.focus()}
          blurOnSubmit={false}
          onChangeText={km => setKm(km)}
        />

        <Text style={styles.tipo}>Tipo do combustível *</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <CheckBox
            title="Gasolina"
            checked={tipo === 'gasolina'}
            onPress={() => setTipo('gasolina')}
          />

          <CheckBox
            title="Diesel"
            checked={tipo === 'diesel'}
            onPress={() => setTipo('diesel')}
          />
        </View>

        <Input
          keyboardType="numeric"
          label="Litros *"
          value={`${litros}`}
          errorMessage={ltError}
          returnKeyType="done"
          ref={litrosTxt}
          blurOnSubmit={false}
          onSubmitEditing={save}
          onChangeText={litros => setLitros(litros)}
        />

        <Botao
          onPress={save}
          // isSubmetendo={this.props.isSubmetendo}
          title="Concluir"
          name="check"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  veiculo: {
    color: 'red',
  },
  txtVeiculo: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  tipo: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'gray',
  },
});
