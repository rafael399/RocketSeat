/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { MdAddBox, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function Students() {
  api.get('/registration');

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>

        <span>
          <button type="button">
            <MdAddBox size={22} color="#fff" />
            <span>CADASTRAR</span>
          </button>
          <div>
            <MdSearch size={18} color="#999" />
            <input type="text" placeholder="Buscar aluno" />
          </div>
        </span>
      </header>

      <Content>
        <table>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </tr>
          <tr>
            <td>Aluno 1</td>
            <td>email1@email.com</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
          <tr>
            <td>Aluno 1</td>
            <td>email1@email.com</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
          <tr>
            <td>Aluno 1</td>
            <td>email1@email.com</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
          <tr>
            <td>Aluno 1</td>
            <td>email1@email.com</td>
            <td>20</td>
            <td>
              <button type="button">editar</button>
              <button type="button">apagar</button>
            </td>
          </tr>
        </table>
      </Content>
    </Container>
  );
}
