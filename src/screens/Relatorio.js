import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Header from '../components/Header'
import UltimasViagens from '../components/UltimasViagens'
import DatePicker from 'react-native-datepicker'
import Botao from '../components/Botao'
import moment from 'moment'

export default class Relatorio extends React.Component {

    state = {
        // date:"2016-05-15",
        // datetime: '2016-05-05 20:00'
        datetime: moment().format('YYYY-MM-DD[T]HH:mm')
    }

    pesquisar = () => {
        console.log(this.state.datetime)
    }

    render () {
        return (
            <View style={styles.container}>
                <Header />

                <View>                    
                    <UltimasViagens />

                    <Text style={styles.title}>Realize uma filtragem:</Text>

                    {/* <VeiculosSelect /> */}

                    <DatePicker
                        style={{width: 200}}
                        date={this.state.datetime}
                        mode="datetime"
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        minuteInterval={10}
                        onDateChange={(datetime) => {this.setState({datetime: datetime})}} />

                    <Botao onPress={() => this.pesquisar()}
                        title='Pesquisar' />
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
        fontSize: 15
    }
})