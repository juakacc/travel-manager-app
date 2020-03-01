import React from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native'
import axios from 'axios'
import ListItem from '../components/ListItem'
import Titulo from '../components/Titulo'

import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../components/ActionButton'

class ListVeiculos extends React.Component {

    state = {
        veiculos: [],
        isLoading: false,
        buttonIsVisible: true
    }   

    _listViewOffset = 0

    loadVeiculos = () => {
        this.setState({ isLoading: true })
        axios.get('veiculos')
        .then(res => {
            this.setState({ 
                veiculos: res.data,
                isLoading: false
            })
        })
        .catch(err => {
            this.props.set_mensagem(err)
            this.setState({ isLoading: false })
        })
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.loadVeiculos()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.isLoading} />

                <Titulo titulo='Veículos cadastrados' />

                <FlatList
                    data={this.state.veiculos}
                    renderItem={({item}) =>
                        <ListItem 
                            navigation={this.props.navigation}
                            editScreen='CadastrarVeiculo'
                            item={{ id: item.id, title: item.nome }} />
                    }
                    keyExtractor={item => `${item.id}`}
                    ListEmptyComponent={<Text style={styles.semItens}>Nenhum item a ser exibido</Text>}
                    onRefresh={() => this.loadVeiculos()}
                    refreshing={this.state.isLoading}

                    onScroll={(event) => {
                        const currentOffset = event.nativeEvent.contentOffset.y
                        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset) ? 'down' : 'up'
                        const buttonIsVisible = direction == 'up'

                        if (buttonIsVisible != this.state.buttonIsVisible) {
                          this.setState({ buttonIsVisible })
                        }
                        this._listViewOffset = currentOffset  
                    }} />

                <ActionButton 
                    visible={this.state.buttonIsVisible}
                    navigation={this.props.navigation}
                    toScreen='CadastrarVeiculo' />
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
    },
    semItens: {
        margin: 20,
        textAlign: 'center'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(ListVeiculos)