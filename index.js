import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import storeConfig from './src/store/storeConfig';
import { Provider } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import conf from './src/conf';
import PushNotification from "react-native-push-notification";

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: "notify-local", // (required)
  channelName: "My channel", // (required)
  channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
},
(created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

axios.defaults.baseURL = conf.baseurl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const configureToken = async () => {
  const json = await AsyncStorage.getItem('userData');
  const userData = JSON.parse(json) || {};

  if (userData.token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${userData.token}`,
    };
  }
};

configureToken();

const storeFunction = storeConfig();

const Redux = () => (
  <Provider store={storeFunction}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
