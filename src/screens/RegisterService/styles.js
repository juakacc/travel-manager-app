import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

import commonStyles from '../../commonStyles';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 5px;
  background-color: #fff;
`;

export const TituloRevisao = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 5px;
`;

export const ContainerRevisao = styled.View`
  padding: 10px;
  margin: 10px;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #000;
  justify-content: center;
  display: ${props => (props.show ? 'flex' : 'none')};
`;

export const TextAlertRevisao = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f00;
  align-self: center;
  margin-top: 10px;
`;

export const DateShowRevisao = styled.Text`
  font-size: 15px;
  color: #a50;
  align-self: center;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;

  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #a50;
`;

export const DescriptionTxt = styled.TextInput``;

export const styles = StyleSheet.create({
  veiculo: {
    color: 'red',
  },
  txtVeiculo: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  tipo: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'gray',
  },
  veiculoError: {
    fontSize: 13,
    color: commonStyles.colors.danger,
    marginLeft: 10,
  },
  veiculoTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: commonStyles.colors.gray.main,
    marginLeft: 10,
  },
});
