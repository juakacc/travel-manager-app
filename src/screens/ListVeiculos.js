import React from 'react'
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import ActionButton from 'react-native-action-button'
import axios from 'axios'
import ListItem from '../components/ListItem'
import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyles from '../commonStyles'
import Titulo from '../components/Titulo'

import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'

class ListVeiculos extends React.Component {

    state = {
        veiculos: []
    }

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.get('veiculos')
            .then(res => {
                this.setState({ veiculos: res.data })
            })
            .catch(err => {
                this.props.set_mensagem(err)
            })
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Titulo titulo='Veículos cadastrados' />

                <ScrollView>
                    {this.state.veiculos.map(item => (
                        <ListItem 
                            navigation={this.props.navigation}
                            editScreen='CadastrarVeiculo'
                            id={item.id}
                            titulo={item.nome}
                            key={item.id} />
                    ))}
                </ScrollView>

                <ActionButton
                    buttonColor={commonStyles.colors.principal}
                    renderIcon={() => (
                        <Icon name='plus' color='black' size={20} />
                    )}
                    onPress={() => { this.props.navigation.navigate('CadastrarVeiculo') }}
                />    
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },  
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(ListVeiculos)