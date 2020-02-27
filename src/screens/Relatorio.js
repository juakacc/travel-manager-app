import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import Header from '../components/Header'
import UltimasViagens from '../components/UltimasViagens'
import DateTimePicker from '@react-native-community/datetimepicker'
import Botao from '../components/Botao'
import moment from 'moment'

import functions from '../functions'

import { connect } from 'react-redux'
import { filtrarViagens } from '../store/actions/viagem'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ItemViagemConcluida from '../components/ItemViagemConcluida'
import Titulo from '../components/Titulo'

export const BotaoData = props => {
    return (
        <View onPress={() => props.onPress()}>
            <Ionicons name='ios-time' size={15} />
            <Text>
                <Icon name='clock' size={15} /> 
                
                {functions.getTimeString(props.datetime)}
            </Text>
        </View>
    )
}

class Relatorio extends React.Component {
    
    state = {
        date: new Date(moment().format('YYYY-MM-DD[T]HH:mm')),
        datetime: moment().format('YYYY-MM-DD[T]HH:mm'),
        mode: 'date',
        show: false,

        pre_made_date: '',
        pre_made_time: ''
    }

    pesquisar = () => {
        const dataPesquisar = moment(this.state.datetime).format('YYYY-MM-DD HH:mm:ss')
        console.log('DateTime', dataPesquisar)
        this.props.onFiltrarViagens(dataPesquisar)
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

    render () {
        const { show, date, mode } = this.state
        
        return (
            <View style={styles.container}>
                <Header />
                <Titulo titulo='Relatórios' />
                
                <ScrollView>
                    <UltimasViagens navigation={this.props.navigation} />

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
                        isSubmetendo={this.props.isSubmetendo}
                        title='Pesquisar'
                        name='search'
                    />

                    <View style={styles.resultados}>
                        { this.props.viagens_filtradas.length > 0 ?
                            this.props.viagens_filtradas.map(item => (
                                <ItemViagemConcluida viagem={item} navigation={this.props.navigation} key={item.id} />
                            )) :
                            <Text style={styles.txtSemResultado}>Nenhum resultado encontrado</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ viagem }) => {
    return {
        viagens_filtradas: viagem.viagens_filtradas,
        isSubmetendo: viagem.isSubmetendo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFiltrarViagens: date => dispatch(filtrarViagens(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Relatorio)

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