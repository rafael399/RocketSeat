/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddBox, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import api from '~/services/api';

import { cancelRegistrationRequest } from '~/store/modules/registration/actions';

import { Container, Content } from './styles';

export default function Registrations() {
  const dispatch = useDispatch();

  const [registrations, setRegistrations] = useState([]);

  async function loadRegistrations() {
    const response = await api.get('/registration');

    const data = response.data.map(registration => {
      return {
        ...registration,
        formatedStartDate: format(
          parseISO(registration.start_date),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
        studentName: registration.student
          ? registration.student.name
          : 'Aluno Deletado',
        planTitle: registration.plan
          ? registration.plan.title
          : 'Plano Deletado',
        formatedEndDate: format(
          parseISO(registration.end_date),
          "dd' de 'MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
      };
    });

    setRegistrations(data);
  }

  function handleCancel(id) {
    dispatch(cancelRegistrationRequest(id, loadRegistrations));
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>

        <span>
          <Link to="/newRegistration">
            <MdAddBox size={22} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <table>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th />
          </tr>
          {registrations.map(registration => (
            <tr>
              <td>
                {registration.student ? (
                  registration.student.name
                ) : (
                  <span className="deleted">Aluno deletado</span>
                )}
              </td>
              <td>
                {registration.plan ? (
                  registration.plan.title
                ) : (
                  <span className="deleted">Plano deletado</span>
                )}
              </td>
              <td>{registration.formatedStartDate}</td>
              <td>{registration.formatedEndDate}</td>
              <td>
                {registration.active ? (
                  <MdCheckBox size={26} color="#42CB59" />
                ) : (
                  <MdCheckBoxOutlineBlank size={26} color="#ddd" />
                )}
              </td>
              <td>
                <Link
                  to={{
                    pathname: '/editRegistration',
                    state: {
                      registration,
                    },
                  }}
                >
                  editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleCancel(registration.id)}
                >
                  cancelar
                </button>
              </td>
            </tr>
          ))}
        </table>
      </Content>
    </Container>
  );
}
