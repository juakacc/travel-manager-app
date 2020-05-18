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

export default props => {
  const s = props.style ? props.style : {};

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, s]}
      onPress={props.onPress}
      disabled={props.isSubmetendo}
    >
      {props.isSubmetendo ? (
        <ActivityIndicator
          animating
          size="small"
          color={commonStyles.colors.secondary.main}
        />
      ) : (
        <View style={styles.btnView}>
          {props.name && <Icon name={props.name} size={20} />}
          {props.title && (
            <Text style={styles.buttonTxt}>{' ' + props.title}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 5,
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: commonStyles.colors.primary.main,
  },
  buttonTxt: {
    fontSize: 20,
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
