import React from 'react'
import {Picker} from 'react-native'


export default props => {
    return (
        <Picker>
            <Picker.Item label='Gol02 - 40.000 KM' value='gol_01' />
            <Picker.Item label='Gol01 - 40.000 KM' value='gol_01' />
        </Picker>
    )
}