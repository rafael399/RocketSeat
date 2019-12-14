/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdSave, MdArrowBack } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  createRegistrationRequest,
  updateRegistrationRequest,
} from '~/store/modules/registration/actions';

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

export default function RegistrationInfo({ title, from }) {
  const registration = useSelector(state => state.registration.registration);
  const dispatch = useDispatch();

  // const [startDate, setStartDate] = useState(new Date());

  // const [plan, setPlan] = useState(
  //   registration && from === 'edit' ? registration.duration : null
  // );
  // const [price, setPrice] = useState(
  //   registration && from === 'edit' ? registration.price : null
  // );
  // const [totalPrice, setTotalPrice] = useState(duration * price);

  function handleSubmit(data) {
    switch (from) {
      case 'edit':
        dispatch(updateRegistrationRequest({ id: registration.id, ...data }));
        break;
      case 'newRegistration':
        dispatch(createRegistrationRequest(data));
        break;
      default:
        break;
    }
  }

  // useEffect(() => {
  //   setTotalPrice(duration * price);
  // }, [duration, price]);

  return (
    <Container>
      <header>
        <h1>{title}</h1>

        <span>
          <Link to="/registration">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          // initialData={from === 'edit' ? plan : null}
        >
          <Input name="student" label="ALUNO" />
          <div>
            <div>
              <Input
                name="plan"
                type="check"
                label="PLANO"
                // value={duration}
                // onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="startDate"
                type="date"
                label="DATA DE INÍCIO"
                // onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <Input
                name="endDate"
                type="date"
                label="DATA DE TÉRMINO"
                // value={totalPrice}
                disabled
              />
            </div>
            <div>
              <Input
                name="totalPrice"
                type="number"
                step="0.01"
                label="VALOR FINAL"
                // value={totalPrice}
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

RegistrationInfo.propTypes = {
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
};
