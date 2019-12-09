import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.png';

export default function SignIn() {
  function handleSubmit(data) {}

  return (
    <>
      <img src={logo} alt="GymPoint" />
      <strong>GYMPOINT</strong>

      <Form onSubmit={handleSubmit}>
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
