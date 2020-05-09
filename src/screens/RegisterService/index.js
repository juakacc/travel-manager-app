import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import GeneralStatusBarColor from '../../components/GeneralStatusBarColor';
import Titulo from '../../components/Titulo';
import commonStyles from '../../commonStyles';
import Botao from '../../components/Botao';

import {
  Container,
  ContainerRevisao,
  TituloRevisao,
  DateShowRevisao,
  TextAlertRevisao,
} from './styles';

export default function RegisterService({ navigation }) {
  const [veiculo, setVeiculo] = useState(() => {
    return navigation.getParam('veiculo');
  });

  const [km, setKm] = useState(() => {
    return veiculo.quilometragem;
  });
  const [description, setDescription] = useState('');

  const [dateShow, setDateShow] = useState('__/__/____');
  const [date, setDate] = useState(new Date(moment()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [kmError, setKmError] = useState('');
  const [ltError, setLtError] = useState('');

  const isValid = () => {
    setKmError('');
    setLtError('');
    let valid = true;

    if (isNaN(km)) {
      setKmError('Quilometragem inválida');
      valid = false;
    }
    return valid;
  };

  const save = () => {
    if (isValid()) {
      const event = {
        km,
        id: veiculo.id,
      };
      Alert.alert('Saving data');
    }
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      // setShow(Platform.OS === 'ios');

      setDate(currentDate);
      setDateShow(moment(currentDate).format('DD/MM/YYYY'));
      console.log('server: ', moment(currentDate).format());
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Container>
        <GeneralStatusBarColor
          backgroundColor={commonStyles.colors.secundaria}
          barStyle="ligth-content"
        />
        <Titulo titulo="Tela de serviço" />

        <Text style={styles.txtVeiculo}>
          Veículo: <Text style={styles.veiculo}>{veiculo.nome}</Text>
        </Text>

        <Input
          keyboardType="numeric"
          label="Quilometragem *"
          value={`${km}`}
          errorMessage={kmError}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={km => setKm(km)}
        />

        <Input
          label="Descrição *"
          value={description}
          returnKeyType="done"
          // ref={input => (this.input_02 = input)}
          onSubmitEditing={save}
          onChangeText={d => setDescription(d)}
        />

        <ContainerRevisao>
          <TituloRevisao>Troca/Revisão</TituloRevisao>

          <Input
            keyboardType="numeric"
            label="Quilometragem *"
            value={`${km}`}
            errorMessage={kmError}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={km => setKm(km)}
          />

          <TextAlertRevisao>
            Altere a data caso o veículo necessite de notificação
          </TextAlertRevisao>

          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View>
              <DateShowRevisao>
                <Icon name="calendar-check" color="#a50" size={20} />
                {`  ${dateShow}`}
              </DateShowRevisao>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </ContainerRevisao>

        <Botao
          onPress={save}
          // isSubmetendo={this.props.isSubmetendo}
          title="Concluir"
          name="check"
        />
      </Container>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
