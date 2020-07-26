import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import functions from '../functions';
import Loader from '../components/Loader';
import ActionButton from '../components/ActionButton';

const DetailVehicle = ({
  route: {
    params: { vehicleId },
  },
  navigation,
}) => {
  const [vehicle, setVehicle] = useState({
    nome: 'Teste',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (vehicleId) {
      axios
        .get(`/veiculos/${vehicleId}`)
        .then(res => {
          setVehicle(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const {
    nome,
    placa,
    marca,
    modelo,
    quilometragem,
    renavam,
    cnh_requerida,
    disponivel,
  } = vehicle;

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Titulo titulo={nome} />

        <Text style={styles.infoTitle}>Placa</Text>
        <Text style={styles.infoValue}>{placa}</Text>

        <Text style={styles.infoTitle}>Renavam</Text>
        <Text style={styles.infoValue}>{renavam}</Text>

        <Text style={styles.infoTitle}>Marca</Text>
        <Text style={styles.infoValue}>{marca}</Text>

        <Text style={styles.infoTitle}>Modelo</Text>
        <Text style={styles.infoValue}>{modelo}</Text>

        <Text style={styles.infoTitle}>Quilometragem</Text>
        <Text style={styles.infoValue}>
          {functions.formatNumber(quilometragem)}
        </Text>

        <Text style={styles.infoTitle}>CNH Requerida</Text>
        <Text style={styles.infoValue}>{cnh_requerida}</Text>

        <Text style={styles.infoTitle}>Disponível para viagem?</Text>
        <Text style={styles.infoValue}>{disponivel ? 'SIM' : 'NÃO'}</Text>
      </ScrollView>
      <ActionButton
        icon="pencil-alt"
        navigation={navigation}
        toScreen="CadastrarVeiculo"
        params={{ itemId: vehicleId }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: commonStyles.colors.secondary.main,
    fontSize: 14,
  },
  infoValue: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
    color: commonStyles.colors.secondary.main,
  },
});

export default DetailVehicle;
