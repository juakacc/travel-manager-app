import React, { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

import Titulo from '../components/Titulo';
import ItemVeiculo from '../components/ItemVeiculo';
import commonStyles from '../commonStyles';
import Loader from '../components/Loader';

export default function SelecionarVeiculo({ navigation }) {
  const [veiculos, setVeiculos] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    loadVeiculos();
  }, []);

  const loadVeiculos = () => {
    setLoaded(false);
    axios
      .get('veiculos/disponiveis')
      .then(res => {
        setVeiculos(res.data);
        setLoaded(true);
      })
      .catch(err => {
        setLoaded(true);
      });
  };

  return (
    <>
      <Loader isLoading={!isLoaded} />
      {isLoaded && (
        <SafeAreaView style={styles.container}>
          <Titulo titulo="Selecione um veículo" />
          <FlatList
            data={veiculos}
            renderItem={({ item }) => (
              <ItemVeiculo veiculo={item} navigation={navigation} />
            )}
            keyExtractor={item => `${item.id}`}
            ListEmptyComponent={
              <Text>
                Nenhum veículo disponível no momento. Aguarde (ou atualize a
                página) até que um esteja disponível
              </Text>
            }
            onRefresh={() => loadVeiculos()}
            refreshing={!isLoaded}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
});
