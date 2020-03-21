import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Botao from '../components/Botao'

import { connect } from 'react-redux'
import { userLoggout } from '../store/actions/user'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import commonStyles from '../commonStyles'

class Logout extends React.Component {

    logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBarColor backgroundColor={commonStyles.colors.secundaria} barStyle="ligth-content"/>    
                <Text>Você deseja realmente sair da aplicação? </Text>

                <Botao title='Sair' 
                    name='sign-out-alt' 
                    onPress={() => this.logout()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingTop:50
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(userLoggout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)