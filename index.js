import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { AppRegistry } from 'react-native';
import PushNotification from "react-native-push-notification";

import App from './src/App';
import { name as appName } from './app.json';
import storeConfig from './src/store/storeConfig';
import conf from './src/conf';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    // console.log("ACTION:", notification.action);
    // console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    // console.error(err.message, err);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel({
  channelId: "notify-local",
  channelName: "My channel",
  channelDescription: "A channel to categorise your notifications",
},
(created) => console.log(`createChannel returned '${created}'`)
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
