import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';
import moment from 'moment';

export default function ItemRevision({ revisao, navigation }) {
  const second = revisao.momento
    ? moment(revisao.momento).format('DD/MM/yyyy')
    : `${revisao.quilometragem} KM`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('RegisterService', {
          revisao,
        });
      }}
    >
      <Text style={styles.txt}>{revisao.descricao}</Text>
      <Text style={styles.txtSecondary}>{second}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 3,
    borderRadius: 5,
    borderColor: commonStyles.colors.secondary.main,
    borderWidth: 2,
  },
  txt: {
    fontSize: 15,
    textAlign: 'center',
    color: commonStyles.colors.secondary.main,
  },
  txtSecondary: {
    fontSize: 11,
    textAlign: 'center',
    color: commonStyles.colors.secondary.main,
  },
});
