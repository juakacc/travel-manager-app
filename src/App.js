import React, { Component } from 'react';

import Navigator from './Navigator'

import { connect } from 'react-redux';
import { setMensagem } from './store/actions/mensagem'
import { ToastAndroid } from 'react-native';

import NavigatorService from './NavigatorService'
import { SafeAreaProvider } from 'react-native-safe-area-context';

class App extends Component {

  componentDidUpdate = () => {
    if (this.props.message && this.props.message.toString().trim()) {
      ToastAndroid.show(this.props.message, ToastAndroid.SHORT)
      this.props.clearMessage()
    }
  }

  render () {
    return (
        <SafeAreaProvider>
            <Navigator 
                ref={navigatorRef => {
                    NavigatorService.setTopLevelNavigator(navigatorRef)
                }}
            />
      </SafeAreaProvider>
    )
  }  
}

const mapStateToProps = ({ mensagem }) => {
  return {
    message: mensagem.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMensagem(''))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)