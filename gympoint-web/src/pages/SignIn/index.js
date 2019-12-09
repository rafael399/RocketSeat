import React from 'react';

import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />
      <strong>GYMPOINT</strong>

      <form>
        <label htmlFor="email">
          SEU E-MAIL
          <input type="email" id="email" placeholder="exemplo@email.com" />
        </label>

        <label htmlFor="password">
          SUA SENHA
          <input type="password" id="password" placeholder="***********" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}
