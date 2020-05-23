import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const execute = () => {
      savedCallback.current();
    };
    let id = setInterval(execute, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default function ShowRevisoes({ revisoes }) {
  const [show, setShow] = useState(0);

  useInterval(() => {
    if (show < revisoes.length - 1) setShow(show + 1);
    else setShow(0);
  }, 2000);

  return (
    <View>
      <Text>Revisões pendentes para esse veículo:</Text>
      <View style={styles.containerButton}>
        <Text style={styles.text}>{revisoes[show].descricao}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerButton: {
    marginTop: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: commonStyles.colors.secondary.main,
  },
  text: {
    fontSize: 14,
    paddingVertical: 10,
    textAlign: 'center',
    color: commonStyles.colors.secondary.main,
  },
});
