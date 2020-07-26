import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyles from '../commonStyles';

export default function ActionButton({
  visible,
  icon,
  navigation,
  toScreen,
  params,
}) {
  return (
    <FloatingAction
      color={commonStyles.colors.secondary.main}
      visible={visible}
      showBackground={false}
      floatingIcon={
        <Icon name={icon} color={commonStyles.colors.gray.white} size={20} />
      }
      onPressMain={() => {
        navigation.navigate(toScreen, params);
      }}
    />
  );
}
