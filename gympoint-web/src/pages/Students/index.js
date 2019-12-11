/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { MdAddBox, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

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
          {students.map(student => (
            <tr>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button type="button">editar</button>
                <button type="button">apagar</button>
              </td>
            </tr>
          ))}
        </table>
      </Content>
    </Container>
  );
}
