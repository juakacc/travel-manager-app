import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Header from '../components/Header'
import UltimasViagens from '../components/UltimasViagens'
import DateTimePicker from '@react-native-community/datetimepicker'
import Botao from '../components/Botao'
import moment from 'moment'

import functions from '../functions'

import { connect } from 'react-redux'
import { filtrarViagens } from '../store/actions/viagem'

class Relatorio extends React.Component {

    // componentDidMount() {
    //     this.props.navigation.openDrawer();
    // }
    
    state = {
        date: new Date(moment().format('YYYY-MM-DD[T]HH:mm')),
        datetime: moment().format('YYYY-MM-DD[T]HH:mm'),
        mode: 'date',
        show: false,

        pre_made_date: '',
        pre_made_time: ''
    }

    pesquisar = () => {
        console.log('DateTime', moment(this.state.datetime).format('YYYY-MM-DD[T]HH:mm'))
        this.props.onFiltrarViagens(moment(this.state.datetime).format('YYYY-MM-DD[T]HH:mm'))
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
                <Header navigation={this.props.navigation} />

                <View>                    
                    <UltimasViagens />

                    <Text style={styles.title}>Realize uma filtragem:</Text>

                    <View>
                        <View>
                            <Button onPress={this.showDatepicker} 
                                title={functions.getDateString(this.state.datetime)} />
                        </View>
                        { show && <DateTimePicker 
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
                        }
                    </View>

                    <Botao onPress={() => this.pesquisar()}
                        title='Pesquisar' />

                    {this.props.viagens_filtradas.map(item => {return (
                        <View key={item.id}>
                            <Text>{item.veiculo.nome} - {item.motorista.nome}</Text>
                        </View>
                    )})}
                </View>
            </View>
        )
    }
}

const mapStateToProps = ({viagem}) => {
    return {
        viagens_filtradas: viagem.viagens_filtradas
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
        fontSize: 15
    }
})