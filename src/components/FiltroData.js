import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemViagemConcluida from './ItemViagemConcluida';
import Botao from './Botao';
import DateTimePicker from '@react-native-community/datetimepicker';
import functions from '../functions';
import moment from 'moment';

import { setMensagem } from '../store/actions/mensagem';
import { connect } from 'react-redux';
import axios from 'axios';
import commonStyles from '../commonStyles';

class FiltroData extends React.Component {
  state = {
    date: new Date(moment().format('YYYY-MM-DD[T]HH:mm')),
    datetime: moment().format('YYYY-MM-DD[T]HH:mm'),
    mode: 'date',
    show: false,

    pre_made_date: '',
    pre_made_time: '',

    viagens: [],
    isSubmetendo: false,
  };

  pesquisar = () => {
    const dataPesquisar = moment(this.state.datetime).format(
      'YYYY-MM-DD HH:mm:ss',
    );

    this.setState({ isSubmetendo: true });

    axios
      .get(`viagens?date=${dataPesquisar}`)
      .then(res => {
        this.setState({
          viagens: res.data,
          isSubmetendo: false,
        });
      })
      .catch(err => {
        this.props.set_mensagem(err);
        this.setState({ isSubmetendo: false });
      });
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    if (this.state.mode === 'date') {
      let dd = moment(date).format('YYYY-MM-DD');
      this.setState({
        mode: 'time',
        pre_made_date: dd,
      });
    } else {
      let tt = moment(date).format('HH:mm:ss');
      let combine = this.state.pre_made_date + 'T' + tt;

      this.setState({
        show: false,
        pre_made_time: tt,
        date: new Date(moment(combine)),
        datetime: combine,
      });
    }
  };

  showDatepicker = () => {
    this.setState({
      show: true,
      mode: 'date',
    });
  };

  render() {
    const { show, date, mode } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Realize uma filtragem:</Text>

        <View style={styles.form}>
          <View>
            <TouchableHighlight onPress={this.showDatepicker}>
              <Text style={styles.dateTimeSelect}>
                <Ionicons name="ios-calendar" size={15} />{' '}
                {functions.getDateString(this.state.datetime) + ' '}
                <Ionicons name="ios-time" size={15} />{' '}
                {functions.getTimeString(this.state.datetime)}
              </Text>
            </TouchableHighlight>
          </View>

          <Botao
            style={styles.botao}
            onPress={() => this.pesquisar()}
            isSubmetendo={this.state.isSubmetendo}
            title="Pesquisar"
            name="search"
          />
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}

        <View style={styles.resultados}>
          <FlatList
            data={this.state.viagens}
            renderItem={({ item }) => (
              <ItemViagemConcluida
                viagem={item}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <Text style={styles.txtSemResultado}>
                Nenhum resultado encontrado
              </Text>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  botao: {
    width: 150,
    height: 45,
  },
  container: {},
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  dateTimeSelect: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: commonStyles.colors.secundaria,
    borderRadius: 10,
    padding: 10,
  },
  txtSemResultado: {
    textAlign: 'center',
    marginTop: 10,
  },
  resultados: {
    marginTop: 10,
    height: 175,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    set_mensagem: msg => dispatch(setMensagem(msg)),
  };
};

export default connect(null, mapDispatchToProps)(FiltroData);
