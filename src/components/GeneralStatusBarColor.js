import React from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'

const GeneralStatusBarColor = ({backgroundColor, barStyle, ...props}) =>
    <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} style={styles.statusBar} />

export default GeneralStatusBarColor

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
    }
})