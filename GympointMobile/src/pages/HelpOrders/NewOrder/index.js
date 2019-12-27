import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, Content, FormInput, SubmitButton } from './styles';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const studentId = useSelector(state => state.student.student.id);

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post(`/students/${studentId}/help-orders`, {
        question,
      });

      setLoading(false);

      Alert.alert('Sucesso', 'Seu pedido de ajuda foi enviado com sucesso.');

      navigation.goBack();
    } catch (err) {
      setLoading(false);

      Alert.alert(
        'Falha na autenticação',
        'Houve um erro no login, verifique seus dados'
      );
    }
  }

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <FormInput
            placeholder="Inclua seu pedido de auxílio"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={question}
            onChangeText={setQuestion}
            multiline
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar pedido
          </SubmitButton>
        </Content>
      </Container>
    </Background>
  );
}

NewOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={30} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
