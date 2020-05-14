import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';

import axios from 'axios';
import { setMensagem } from '../store/actions/mensagem';

import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import Botao from '../components/Botao';
import { connect } from 'react-redux';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function RegisterSupply({ route, navigation, ...props }) {
  const [veiculo, setVeiculo] = useState(route.params.veiculo);
  const [km, setKm] = useState(veiculo.quilometragem);
  const [litros, setLitros] = useState(0);
  const [tipo, setTipo] = useState('gasolina');
  const [kmError, setKmError] = useState('');
  const [ltError, setLtError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSub, setSub] = useState(false);

  const litrosTxt = useRef(null);

  const prevLoading = usePrevious(isLoading);

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
        quilometragem: km,
        quantidade: litros,
        tipo,
        veiculo: veiculo.id,
      };

      setLoading(true);
      setSub(true);
      axios
        .post('/abastecimentos', event)
        .then(res => {
          setLoading(false);
          setSub(false);
          props.onSetMensagem('Abastecimento salvo com sucesso');
        })
        .catch(err => {
          setSub(false);
          props.onSetMensagem(err);
        });
    }
  };

  useEffect(() => {
    if (prevLoading && !isLoading) {
      navigation.goBack();
    }
  }, [isLoading]);

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
          value={litros !== 0 ? `${litros}` : ''}
          errorMessage={ltError}
          returnKeyType="done"
          ref={litrosTxt}
          blurOnSubmit={false}
          onSubmitEditing={save}
          onChangeText={litros => setLitros(litros)}
        />

        <Botao
          onPress={save}
          isSubmetendo={isSub}
          title="Concluir"
          name="check"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onSetMensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterSupply);

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
