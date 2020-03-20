import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyles from '../commonStyles'

export default class ListItem extends React.Component {

    editar = () => {
        this.props.navigation.navigate(this.props.editScreen, { 
            itemId: this.props.item.id
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nomeMotorista}>
                    <Text style={styles.txtNome}>{ this.props.item.title }</Text>
                </View>

                {this.props.isEdit ? 
                <View style={styles.viewEdit}>
                    <TouchableOpacity onPress={this.editar} style={styles.btnEdit} >
                        <Icon name='edit' size={20} color='yellow' />
                    </TouchableOpacity>
                </View> : 
                <View style={styles.viewEdit}>
                    <TouchableOpacity onPress={this.editar} style={styles.btnEdit} >
                        <Icon name='info-circle' size={20} color='yellow' />
                    </TouchableOpacity>
                </View> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        margin: 5,
        backgroundColor: commonStyles.colors.secundaria,
        borderRadius: 5,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center'
    },
    txtNome: {
        color: 'white',
        fontSize: 20
    },
    nomeMotorista: {
        flex: 2,        
    },  
    viewEdit: {
        flex: 1
    },
    btnEdit: {
        padding: 20,
        alignItems: 'center'
    }
})