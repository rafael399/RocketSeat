import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, LogoText, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [studentID, setStudentID] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(studentID));
  }

  function handleIdChange(text) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(text)) {
      return;
    }

    const id = text.split('.');

    setStudentID(id[0]);
  }

  const loading = useSelector(state => state.auth.loading);

  return (
    <Container>
      <Image source={logo} />
      <LogoText>GYMPOINT</LogoText>

      <Form>
        <FormInput
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro (somente números)"
          returnKeyType="send"
          keyboardType="numeric"
          onSubmitEditing={handleSubmit}
          value={studentID}
          onChangeText={handleIdChange}
        />

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
