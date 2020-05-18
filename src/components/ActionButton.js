import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';

export default function (props) {
  return (
    <FloatingAction
      color={commonStyles.colors.primary.main}
      visible={props.visible}
      showBackground={false}
      floatingIcon={
        <Icon
          name="plus"
          color={commonStyles.colors.secondary.main}
          size={20}
        />
      }
      onPressMain={() => {
        props.navigation.navigate(props.toScreen);
      }}
    />
  );
}
