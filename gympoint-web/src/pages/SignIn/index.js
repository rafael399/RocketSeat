import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O campo e-mail precisa ser preenchido'),
  password: Yup.string().required('O campo de senha precisa ser preenchido'),
});

export default function SignIn() {
  function handleSubmit(data) {}

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <strong>GYMPOINT</strong>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="SEU E-MAIL"
          type="email"
          placeholder="exemplo@email.com"
        />

        <Input
          name="password"
          label="SUA SENHA"
          type="password"
          placeholder="***********"
        />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
