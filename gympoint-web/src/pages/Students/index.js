/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddBox, MdSearch } from 'react-icons/md';
import api from '~/services/api';

import { deleteStudentRequest } from '~/store/modules/student/actions';

import { Container, Content } from './styles';

export default function Students() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');

  async function loadStudents(name = '') {
    const response =
      name === ''
        ? await api.get('/students')
        : await api.get(`/students/?q=${name}`);

    setStudents(response.data);
  }

  function handleDelete(id) {
    const result = window.confirm('Tem certeza disso?');

    if (result === true) {
      dispatch(deleteStudentRequest(id, loadStudents));
    }
  }

  useEffect(() => {
    loadStudents(studentName);
  }, [studentName]);

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>

        <span>
          <Link to="/newStudent">
            <MdAddBox size={22} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
          <div>
            <MdSearch size={18} color="#999" />
            <input
              value={studentName}
              placeholder="Buscar aluno"
              onChange={e => setStudentName(e.target.value)}
            />
          </div>
        </span>
      </header>

      <Content>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/editStudent',
                      state: {
                        student,
                      },
                    }}
                  >
                    editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  );
}
