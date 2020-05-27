import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyles from '../commonStyles';

export default function Button({
  style,
  onPress,
  isSubmetendo,
  name,
  title,
  color,
}) {
  const s = style ? style : {};
  const c = color || commonStyles.colors.secondary.main;

  return (
    <TouchableOpacity
      style={[styles(c).buttonContainer, s]}
      onPress={onPress}
      disabled={isSubmetendo}
    >
      {isSubmetendo ? (
        <ActivityIndicator
          animating
          size="small"
          color={commonStyles.colors.secondary.main}
        />
      ) : (
        <View style={styles(c).btnView}>
          {name && <Icon name={name} size={20} color={c} />}
          {title && <Text style={styles(c).buttonTxt}>{' ' + title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = color =>
  StyleSheet.create({
    buttonContainer: {
      height: 40,
      justifyContent: 'center',
      marginVertical: 10,
      borderRadius: 10,
      borderColor: color,
      borderWidth: 2,
    },
    buttonTxt: {
      fontSize: 20,
      color: color,
    },
    btnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
