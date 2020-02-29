import React from 'react'
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native'
import ActionButton from '../components/ActionButton'
import axios from 'axios'
import ListItem from '../components/ListItem'
import Titulo from '../components/Titulo'

import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import Spinner from 'react-native-loading-spinner-overlay'

class ListPessoas extends React.Component {

    state = {
        motoristas: [],
        isLoading: false,
        buttonIsVisible: true
    }
    _listViewOffset = 0

    loadMotoristas = () => {
        this.setState({ isLoading: true })
        axios.get('motoristas')
        .then(res => {
            this.setState({ 
                motoristas: res.data,
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
            this.loadMotoristas()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner visible={this.state.isLoading} />

                <Titulo titulo='Motoristas cadastrados' />

                <FlatList
                    data={this.state.motoristas}
                    renderItem={({ item }) =>
                        <ListItem 
                            navigation={this.props.navigation}
                            editScreen='CadastrarPessoa'
                            item={{ id: item.id, title: item.apelido }} />
                    }
                    keyExtractor={item => `${item.id}`}
                    ListEmptyComponent={<Text>Nenhum informação</Text>}
                    onRefresh={() => this.loadMotoristas()}
                    refreshing={this.state.isLoading}

                    onScroll={(event) => {
                        const currentOffset = event.nativeEvent.contentOffset.y
                        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset) ? 'down' : 'up'
                        const buttonIsVisible = direction == 'up'

                        if (buttonIsVisible != this.state.buttonIsVisible) {
                          this.setState({ buttonIsVisible })
                        }
                        this._listViewOffset = currentOffset  
                    }}
                />

                <ActionButton 
                    visible={this.state.buttonIsVisible}
                    navigation={this.props.navigation}
                    toScreen='CadastrarPessoa' />
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

export default connect(null, mapDispatchToProps)(ListPessoas)