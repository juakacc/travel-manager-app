import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';

import { setMensagem } from '../../store/actions/mensagem';
import Titulo from '../../components/Titulo';
import commonStyles from '../../commonStyles';
import Botao from '../../components/Botao';

import {
  Container,
  ContainerRevisao,
  TituloRevisao,
  DateShowRevisao,
  TextAlertRevisao,
  styles,
} from './styles';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function RegisterService({ route, navigation, ...props }) {
  const [veiculo, setVeiculo] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [revisao, setRevisao] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [km, setKm] = useState(0);
  const [nextKm, setNextKm] = useState(0);

  const [description, setDescription] = useState('');
  const [dateShow, setDateShow] = useState(null);
  const [date, setDate] = useState(new Date(moment()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [veiculoError, setVeiculoError] = useState('');
  const [kmError, setKmError] = useState('');
  const [nextKmError, setNextKmError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [showRevision, setShowRevision] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSub, setSub] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const prevLoading = usePrevious(isLoading);
  const descriptionTxt = useRef(null);

  useEffect(() => {
    const { veiculo, revisao, isAdmin } = route.params;

    if (veiculo) {
      setVeiculo(veiculo);
      setKm(veiculo.quilometragem);
      setNextKm(veiculo.quilometragem);
      setLoaded(true);
    } else if (revisao) {
      setRevisao(revisao);
      setDescription(revisao.descricao);
      setKm(revisao.quilometragem || 0);
      setNextKm(revisao.quilometragem || 0);
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

  const isValid = () => {
    setKmError('');
    setNextKmError('');
    setDescriptionError('');
    setVeiculoError('');
    let valid = true;

    if (!revisao) {
      if (!veiculo?.id) {
        setVeiculoError('Selecione um veículo, por favor');
        valid = false;
      }
    }

    if (isNaN(km)) {
      setKmError('Quilometragem atual inválida');
      valid = false;
    }

    if (description.trim().length === 0) {
      setDescriptionError('Informe uma descrição para o serviço');
      valid = false;
    }

    if (nextKm.toString().length > 0) {
      // Tem algum valor
      if (isNaN(nextKm)) {
        setNextKmError('Quilometragem inválida');
        valid = false;
      }
    }
    return valid;
  };

  const save = () => {
    if (isValid()) {
      const event = {
        quilometragem: parseFloat(km),
        descricao: description,
        revisao: {
          quilometragem: parseFloat(nextKm),
          descricao: description,
          momento: moment(date).format('YYYY-MM-DD[T]HH:mm:ss').toString(),
        },
      };

      if (!dateShow) delete event.revisao.momento;
      if (!showRevision) delete event.revisao;

      setLoading(true);
      setSub(true);
      if (veiculo) {
        // gravando serviço
        axios
          .post(`/veiculos/${veiculo.id}/servicos`, event)
          .then(() => {
            setSub(false);
            setLoading(false);
            props.onSetMensagem('Serviço salvo com sucesso');
          })
          .catch(err => {
            setSub(false);
            props.onSetMensagem(err);
          });
      } else {
        // revisão
        axios
          .put(`/servicos/${revisao.servico.id}/revisoes/${revisao.id}`, event)
          .then(res => {
            setSub(false);
            setLoading(false);
            props.onSetMensagem('Revisão registrada com sucesso');
          })
          .catch(err => {
            setSub(false);
            props.onSetMensagem(err);
          });
      }
    }
  };

  useEffect(() => {
    if (prevLoading && !isLoading) navigation.goBack();
  }, [isLoading]);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate || date;

      setDate(currentDate);
      setDateShow(moment(currentDate).format('DD/MM/YYYY'));
    }
  };

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
          <Container>
            <Titulo titulo="Cadastro de serviço" />

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
              veiculo && (
                <Text style={styles.txtVeiculo}>
                  Veículo: <Text style={styles.veiculo}>{veiculo.nome}</Text>
                </Text>
              )
            )}

            <Input
              keyboardType="numeric"
              label="KM atual *"
              value={`${km}`}
              errorMessage={kmError}
              returnKeyType="next"
              onSubmitEditing={() => descriptionTxt.current.focus()}
              blurOnSubmit={false}
              onChangeText={value => {
                setKm(value);
                setNextKm(value);
              }}
            />

            <Input
              label="Descrição *"
              value={description}
              ref={descriptionTxt}
              errorMessage={descriptionError}
              onChangeText={value => setDescription(value)}
            />

            <CheckBox
              title="Agendar revisão?"
              checked={showRevision}
              onPress={() => setShowRevision(!showRevision)}
            />

            <ContainerRevisao show={showRevision}>
              <TituloRevisao>Troca/Revisão</TituloRevisao>

              <Input
                keyboardType="numeric"
                label="Próximo KM"
                value={`${nextKm}`}
                errorMessage={nextKmError}
                onChangeText={value => setNextKm(value)}
              />

              <TextAlertRevisao>
                Altere a data caso o veículo realize revisão por data
              </TextAlertRevisao>

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View>
                  <DateShowRevisao>
                    <Icon
                      name="calendar-check"
                      color={commonStyles.colors.secondary.main}
                      size={20}
                    />
                    {`  ${dateShow || '___/___/_____'}`}
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
              isSubmetendo={isSub}
              title="Concluir"
              name="check"
            />
          </Container>
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

export default connect(null, mapDispatchToProps)(RegisterService);
