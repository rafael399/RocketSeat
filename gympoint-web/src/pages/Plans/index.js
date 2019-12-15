/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import api from '~/services/api';

import { deletePlanRequest } from '~/store/modules/plan/actions';

import { Container, Content } from './styles';

export default function Plans() {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    const response = await api.get('/plan');

    setPlans(response.data);
  }

  async function handleDelete(id) {
    const result = window.confirm('Tem certeza disso?');

    if (result === true) {
      dispatch(deletePlanRequest(id, loadPlans));
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>

        <span>
          <Link to="/newPlan">
            <MdAddBox size={22} color="#fff" />
            <span>CADASTRAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr>
                <td>{plan.title}</td>
                <td>
                  {plan.duration} {plan.duration === 1 ? 'mês' : 'meses'}
                </td>
                <td>R${plan.price}</td>
                <td>
                  <Link
                    to={{
                      pathname: '/editPlan',
                      state: {
                        plan,
                      },
                    }}
                  >
                    editar
                  </Link>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
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
