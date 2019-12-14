/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdSave, MdArrowBack } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  createPlanRequest,
  updatePlanRequest,
} from '~/store/modules/plan/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.number()
    .integer()
    .required('A duração é obrigatória')
    .typeError('A duração precisa ser um número inteiro.'),
  price: Yup.number()
    .typeError(
      'O preço mensal precisa ser um número com até duas casas decimais.'
    )
    .required('O preço mensal é obrigatório'),
});

export default function PlanInfo({ title, from, plan }) {
  const dispatch = useDispatch();

  const [duration, setDuration] = useState(
    plan && from === 'edit' ? plan.duration : null
  );
  const [price, setPrice] = useState(
    plan && from === 'edit' ? plan.price : null
  );
  const [totalPrice, setTotalPrice] = useState(duration * price);

  function handleSubmit(data) {
    switch (from) {
      case 'edit':
        dispatch(updatePlanRequest({ id: plan.id, ...data }));
        break;
      case 'newPlan':
        dispatch(createPlanRequest(data));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setTotalPrice(duration * price);
  }, [duration, price]);

  return (
    <Container>
      <header>
        <h1>{title}</h1>

        <span>
          <Link to="/plans">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          initialData={from === 'edit' ? plan : null}
        >
          <Input name="title" label="TÍTULO DO PLANO" />
          <div>
            <div>
              <Input
                name="duration"
                type="number"
                min="1"
                label="DURAÇÃO (em meses)"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="price"
                min="1"
                type="number"
                step="0.01"
                label="PREÇO MENSAL"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="totalPrice"
                type="number"
                step="0.01"
                label="PREÇO TOTAL"
                value={totalPrice}
                disabled
              />
            </div>
          </div>

          <button type="submit">
            <MdSave size={22} color="#fff" />
            <div>SALVAR</div>
          </button>
        </Form>
      </Content>
    </Container>
  );
}

PlanInfo.propTypes = {
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  plan: PropTypes.element,
};

PlanInfo.defaultProps = {
  plan: null,
};
