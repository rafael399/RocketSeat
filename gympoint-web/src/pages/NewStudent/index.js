/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { createStudentRequest } from '~/store/modules/student/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('O e-mail é obrigatório'),
  age: Yup.number('A idade precisa ser um número inteiro.')
    .integer('A idade precisa ser um número inteiro.')
    .required('A idade é obrigatória'),
  weight: Yup.number().required('O peso é obrigatório'),
  height: Yup.number().required('A altura é obrigatória'),
});

export default function NewStudent() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(createStudentRequest(data));
  }

  return (
    <Container>
      <header>
        <h1>Cadastro de aluno</h1>

        <span>
          <Link to="/students">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
        </span>
      </header>

      <Content>
        <Form onSubmit={handleSubmit} schema={schema}>
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
