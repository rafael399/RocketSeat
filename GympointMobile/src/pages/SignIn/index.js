import React, { useState } from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, LogoText, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const [studentID, setStudentID] = useState('');

  function handleSubmit() {}

  // const loading = useSelector(state => state.auth.loading);

  return (
    <Container>
      <Image source={logo} />
      <LogoText>GYMPOINT</LogoText>

      <Form>
        <FormInput
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={studentID}
          onChangeText={setStudentID}
        />

        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
