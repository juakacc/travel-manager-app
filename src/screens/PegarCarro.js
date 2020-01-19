import React from 'react'
import { View, Text, Button } from 'react-native'
import VeiculosSelect from '../components/VeiculosSelect'
import Header from '../components/Header'

export default class PegarCarro extends React.Component {

    state = {
        temCarro: false
    }

    render () {

        const disposicaoVeiculos = 
            <View>
                <Text>Disposição atual</Text>
                <Text>Deusinho - Ranger</Text>
                <Text>Romário - Spin</Text>
                <Text>Zezin - Van</Text>
            </View>

        const formVeiculo = 
            <View>
                <Text>Veículos disponíveis:</Text>
                <Text>Ao escolher um veículo será registrado o momento da saída</Text>
                <VeiculosSelect />
                <Button 
                    title='Pegar' />
                {disposicaoVeiculos}
            </View>

        const listVeiculos = 
            <View>
                <Text>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>
                <Text>Veiculo com você: </Text>
                <Text>     - Gol 01 - Saída às 20/01/2020 06h00</Text>
                <Button title='Entregar' />
                <Text>Ao entregar o veículo você deverá informar a quilometragem atual</Text>
                {disposicaoVeiculos}
            </View>

        const veiculos = (this.state.temCarro) ? listVeiculos : formVeiculo

        return (
            <View>
                <Header username='Suzélio' />

                {veiculos}                
            </View>
        )
    }
}