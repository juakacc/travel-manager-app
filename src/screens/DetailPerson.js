import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

import Titulo from '../components/Titulo';
import commonStyles from '../commonStyles';
import Loader from '../components/Loader';
import ActionButton from '../components/ActionButton';

const DetailPerson = ({
  route: {
    params: { personId },
  },
  navigation,
}) => {
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (personId) {
      axios
        .get(`/motoristas/${personId}`)
        .then(res => {
          setPerson(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const { apelido, categoria, cnh, disponivel, nome, telefone } = person;

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Titulo titulo={apelido} />

        <Text style={styles.infoTitle}>Nome</Text>
        <Text style={styles.infoValue}>{nome}</Text>

        <Text style={styles.infoTitle}>Telefone</Text>
        <Text style={styles.infoValue}>{telefone}</Text>

        <Text style={styles.infoTitle}>Nº Habilitação</Text>
        <Text style={styles.infoValue}>{cnh}</Text>

        <Text style={styles.infoTitle}>Categoria Habilitação</Text>
        <Text style={styles.infoValue}>{categoria}</Text>

        <Text style={styles.infoTitle}>Disponível para viagem?</Text>
        <Text style={styles.infoValue}>{disponivel ? 'SIM' : 'NÃO'}</Text>
      </ScrollView>

      <ActionButton
        icon="pencil-alt"
        navigation={navigation}
        toScreen="CadastrarPessoa"
        params={{ itemId: personId }}
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

export default DetailPerson;
