import React from 'react'
import { View, SafeAreaView, FlatList, StyleSheet, ScrollView } from 'react-native'
import ActionButton from 'react-native-action-button'
import axios from 'axios'
import MotoristaItem from '../components/MotoristaItem'
import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyles from '../commonStyles'
import Titulo from '../components/Titulo'

class ListPessoas extends React.Component {

    state = {
        motoristas: []
    }

    componentDidMount() {
        axios.get('motoristas')
        .then(res => {
            this.setState({ motoristas: res.data })
        })
        .catch(err => {

        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Titulo titulo='Motoristas cadastrados' />

                <ScrollView>
                    <FlatList
                        data={this.state.motoristas}
                        renderItem={({item}) => (
                            <MotoristaItem motorista={item} navigation={this.props.navigation} />)
                        }
                        keyExtractor={item => item.id} />
                </ScrollView>

                <ActionButton
                    buttonColor={commonStyles.colors.principal}
                    renderIcon={() => (
                        <Icon name='plus' color='black' size={20} />
                    )}
                    onPress={() => { this.props.navigation.navigate('CadastrarPessoa') }}
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
    },
  });

export default ListPessoas