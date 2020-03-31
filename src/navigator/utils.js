import React from 'react';

import commonStyles from '../commonStyles';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View>
      <Text style={{ fontSize: 24 }}>
        <Icon name="road" size={30} color="#a50" /> Viagens PMO
      </Text>
    </View>
  );
};

export const header = {
  headerTitle: () => <Header />,
  headerStyle: {
    backgroundColor: commonStyles.colors.principal,
  },
};

export const BotaoDrawer = props => (
  <Ionicons
    name="ios-options"
    size={30}
    style={{ marginRight: 10 }}
    onPress={() => props.navigationProps.toggleDrawer()}
  />
);

export const BotaoVoltar = props => (
  <Icon
    name="home"
    size={25}
    style={{ marginLeft: 20 }}
    onPress={() => props.navigationProps.navigate('Home')}
  />
);
