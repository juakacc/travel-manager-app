import React, { Component } from 'react';

import Navigator from './Navigator'

import { connect } from 'react-redux';
import { setMensagem } from './store/actions/mensagem'
import { ToastAndroid } from 'react-native';

class App extends Component {

  componentDidUpdate = () => {
    if (this.props.message && this.props.message.toString().trim()) {
      ToastAndroid.show(this.props.message, ToastAndroid.SHORT)
      this.props.clearMessage()
    }
  }

  render () {
    return (
      <Navigator />
    )
  }  
}

const mapStateToProps = ({ mensagem }) => {
  return {
    title: mensagem.title,
    message: mensagem.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMensagem({
      title: '',
      message: ''
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)