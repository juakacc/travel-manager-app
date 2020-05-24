import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';

import Titulo from '../components/Titulo';
import ItemRevision from '../components/ItemRevision';
import commonStyles from '../commonStyles';

export default function ListRevisions({ route, navigation }) {
  const [revisoes, setRevisoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRevisoes();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRevisoes = () => {
    if (route.params.veiculo) {
      setLoading(true);
      axios
        .get(`veiculos/${route.params.veiculo.id}/revisoes`)
        .then(res => {
          setRevisoes(res.data);
          setLoading(false);
          if (revisoes.length === 0) {
            navigation.goBack();
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Titulo titulo="Revisões pendentes" />
      <Text>Clique em alguma revisão para registrar</Text>
      <FlatList
        data={revisoes}
        refreshing={loading}
        onRefresh={loadRevisoes}
        renderItem={({ item }) => (
          <ItemRevision revisao={item} navigation={navigation} />
        )}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
});
