/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';
import api from '~/services/api';

import {
  editPlanRequest,
  deletePlanRequest,
} from '~/store/modules/plan/actions';

import { Container, Content } from './styles';

export default function Plans() {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);

  function handleEdit(plan) {
    dispatch(editPlanRequest(plan));
  }
  async function loadPlans() {
    const response = await api.get('/plan');

    setPlans(response.data);
  }

  async function handleDelete(id) {
    dispatch(deletePlanRequest(id, loadPlans));
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
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th />
          </tr>
          {plans.map(plan => (
            <tr>
              <td>{plan.title}</td>
              <td>
                {plan.duration} {plan.duration === 1 ? 'mês' : 'meses'}
              </td>
              <td>R${plan.price}</td>
              <td>
                <Link to="/editPlan" onClick={() => handleEdit(plan)}>
                  editar
                </Link>
                <button type="button" onClick={() => handleDelete(plan.id)}>
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </table>
      </Content>
    </Container>
  );
}
