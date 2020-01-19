import React from 'react'
import {View, Text, Button} from 'react-native'
import VeiculosSelect from '../components/VeiculosSelect'

export default class Relatorio extends React.Component {

    render () {
        return (
            <View>
                <Text>Últimas viagens:</Text>
                <Text>Gol 01 - Romário - 90 KM</Text>
                <Text>Gol 01 - Romário - 90 KM</Text>
                <Text>Gol 01 - Romário - 90 KM</Text>
                <Text>Gol 01 - Romário - 90 KM</Text>
                <Text>Gol 01 - Romário - 90 KM</Text>

                <VeiculosSelect />
                <Button title='Pesquisar'/>
            </View>
        )
    }
}