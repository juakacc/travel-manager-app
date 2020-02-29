import React from 'react'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import ItemViagemConcluida from './ItemViagemConcluida'
import Botao from './Botao'
import DateTimePicker from '@react-native-community/datetimepicker'
import functions from '../functions'
import moment from 'moment'

import { setMensagem } from '../store/actions/mensagem'
import { connect } from 'react-redux'
import axios from 'axios'

class FiltroData extends React.Component {

    state = {
        date: new Date(moment().format('YYYY-MM-DD[T]HH:mm')),
        datetime: moment().format('YYYY-MM-DD[T]HH:mm'),
        mode: 'date',
        show: false,

        pre_made_date: '',
        pre_made_time: '',

        viagens: [],
        isSubmetendo: false
    }

    pesquisar = () => {
        const dataPesquisar = moment(this.state.datetime).format('YYYY-MM-DD HH:mm:ss')
        
        this.setState({ isSubmetendo: true })

        axios.get(`viagens?date=${dataPesquisar}`)
        .then(res => {
            this.setState({ 
                viagens: res.data,
                isSubmetendo: false 
            })
        })
        .catch(err => {
            this.props.set_mensagem(err)
            this.setState({ isSubmetendo: false })
        })
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        if (this.state.mode == 'date') {
            let dd = moment(date).format('YYYY-MM-DD')
            this.setState({
                mode: 'time',
                pre_made_date: dd
            })
        } else {
            let tt = moment(date).format('HH:mm:ss')
            let combine = this.state.pre_made_date + "T" + tt
            console.log('COMBINE', combine)

            this.setState({
                show: false,
                pre_made_time: tt,
                date: new Date(moment(combine)),
                datetime: combine
            })
        }
    }
    
    showDatepicker = () => {
        this.setState({
            show: true,
            mode: 'date'
        })
    }

    render() {
        const { show, date, mode } = this.state
        
        return (
            <View>
                <Text style={styles.title}>Realize uma filtragem:</Text>

                <View>
                    <View>
                        <TouchableHighlight onPress={this.showDatepicker}>
                            <Text style={styles.dateTimeSelect}>
                                <Ionicons name='ios-calendar' size={15} /> {functions.getDateString(this.state.datetime) + ' '}
                                <Ionicons name='ios-time' size={15} /> {functions.getTimeString(this.state.datetime)}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    { show ? <DateTimePicker 
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate} />
                        : null
                    }
                </View>

                <Botao 
                    onPress={() => this.pesquisar()}
                    isSubmetendo={this.state.isSubmetendo}
                    title='Pesquisar'
                    name='search' />

                <View style={styles.resultados}>
                    { this.state.viagens.length > 0 ?
                        this.state.viagens.map(item => (
                            <ItemViagemConcluida viagem={item} navigation={this.props.navigation} key={item.id} />
                        )) :
                        <Text style={styles.txtSemResultado}>Nenhum resultado encontrado</Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10
    },
    dateTimeSelect: {
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: 'tomato',
        padding: 10
    },
    txtSemResultado: {
        textAlign: 'center',
        marginTop: 10
    },
    resultados: {
        marginTop: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(FiltroData)