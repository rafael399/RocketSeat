/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdSave, MdArrowBack } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  createStudentRequest,
  updateStudentRequest,
} from '~/store/modules/student/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer()
    .typeError('A idade precisa ser um número inteiro.')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .typeError('O peso precisa ser um número com até duas casas decimais.')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .typeError('A altura precisa ser um número com até duas casas decimais.')
    .required('A altura é obrigatória'),
});

export default function StudentInfo({ title, from, student }) {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    switch (from) {
      case 'edit':
        dispatch(updateStudentRequest({ id: student.id, ...data }));
        break;
      case 'newStudent':
        dispatch(createStudentRequest(data));
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <header>
        <h1>{title}</h1>

        <span>
          <Link to="/students">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          schema={schema}
          initialData={from === 'edit' ? student : null}
        >
          <Input name="name" label="NOME COMPLETO" placeholder="John Doe" />
          <Input
            name="email"
            type="email"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <div>
            <div>
              <Input name="age" type="number" label="IDADE" />
            </div>
            <div>
              <Input
                type="number"
                step="0.01"
                name="weight"
                label="PESO (em kg)"
              />
            </div>
            <div>
              <Input
                name="height"
                type="number"
                step="0.01"
                label="ALTURA (em metros)"
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

StudentInfo.propTypes = {
  title: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  student: PropTypes.element,
};

StudentInfo.defaultProps = {
  student: null,
};
