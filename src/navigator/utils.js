import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import commonStyles from '../commonStyles';

export const headerOptions = (navigation, btnBack = false) => {
  const header = {
    headerTitle: () => <Header />,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: commonStyles.colors.principal,
    },
    headerRight: () => <BotaoDrawer navigation={navigation} />,
  };

  if (btnBack) {
    return Object.assign({}, header, {
      headerLeft: () => <BotaoVoltar navigation={navigation} />,
    });
  } else {
    return header;
  }
};

const Header = () => {
  return (
    <View>
      <Text style={{ fontSize: 24 }}>
        <Icon name="road" size={30} color="#a50" /> Viagens PMO
      </Text>
    </View>
  );
};

const BotaoDrawer = ({ navigation }) => (
  <Ionicons
    name="ios-options"
    size={30}
    style={{ marginRight: 10 }}
    onPress={() => navigation.toggleDrawer()}
  />
);

const BotaoVoltar = ({ navigation }) => (
  <Icon
    name="home"
    size={25}
    style={{ marginLeft: 20 }}
    onPress={() => navigation.navigate('Home')}
  />
);
