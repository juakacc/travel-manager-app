import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

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
  const [veiculo, setVeiculo] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [km, setKm] = useState(0);
  const [litros, setLitros] = useState(0);
  const [tipo, setTipo] = useState('gasolina');

  const [veiculoError, setVeiculoError] = useState('');
  const [kmError, setKmError] = useState('');
  const [ltError, setLtError] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [isSub, setSub] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const litrosTxt = useRef(null);

  useEffect(() => {
    const { veiculo, isAdmin } = route.params;

    if (veiculo) {
      setVeiculo(veiculo);
      setKm(veiculo.quilometragem);
      setLoaded(true);
    } else if (isAdmin) {
      setIsAdmin(true);
      setLoaded(false);
      axios
        .get('/veiculos')
        .then(res => {
          setVeiculos(res.data);
          setLoaded(true);
        })
        .catch(err => {
          console.log(err);
          setLoaded(true);
        });
    }
  }, []);

  const prevLoading = usePrevious(isLoading);

  const isValid = () => {
    setKmError('');
    setLtError('');
    setVeiculoError('');
    let valid = true;

    if (!veiculo?.id) {
      setVeiculoError('Selecione um veículo, por favor');
      valid = false;
    }

    if (isNaN(km)) {
      setKmError('Quilometragem inválida');
      valid = false;
    }
    if (isNaN(litros) || litros <= 0) {
      setLtError('Quantidade inválida');
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
      };

      setLoading(true);
      setSub(true);
      axios
        .post(`/veiculos/${veiculo.id}/abastecimentos`, event)
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

  const changeVeiculo = value => {
    const veiculoSelecionado = veiculos.filter(item => item.id === value)[0];
    setVeiculo(veiculoSelecionado);
    setKm(veiculoSelecionado?.quilometragem || 0);
  };

  const placeholder = {
    label: 'Selecione um veículo...',
    value: null,
    color: '#9EA0A4',
  };

  return (
    <>
      {isLoaded && (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <ScrollView style={styles.container}>
            <GeneralStatusBarColor
              backgroundColor={commonStyles.colors.secondary.main}
              barStyle="ligth-content"
            />
            <Titulo titulo="Cadastro de abastecimento" />

            {isAdmin && veiculos.length > 0 ? (
              <>
                <Text style={styles.veiculoTitle}>Selecione um veículo</Text>
                <RNPickerSelect
                  onValueChange={value => changeVeiculo(value)}
                  value={veiculo?.id}
                  placeholder={placeholder}
                  items={veiculos.map(v => ({
                    label: v.nome,
                    value: v.id,
                  }))}
                />
                <Text style={styles.veiculoError}>{veiculoError}</Text>
              </>
            ) : (
              <Text style={styles.txtVeiculo}>
                Veículo: <Text style={styles.veiculo}>{veiculo.nome}</Text>
              </Text>
            )}

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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
            >
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
          </ScrollView>
        </TouchableWithoutFeedback>
      )}
    </>
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
  veiculoError: {
    fontSize: 13,
    color: commonStyles.colors.danger,
    marginLeft: 10,
  },
  veiculoTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: commonStyles.colors.gray.main,
    marginLeft: 10,
  },
  tipo: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'gray',
  },
});
