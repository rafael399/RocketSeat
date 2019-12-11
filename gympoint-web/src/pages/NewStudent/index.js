/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';

export default function NewStudent() {
  function handleSubmit() {}

  return (
    <Container>
      <header>
        <h1>Cadastro de aluno</h1>

        <span>
          <Link to="/students">
            <MdArrowBack size={22} color="#fff" />
            <span>VOLTAR</span>
          </Link>
          <button type="button">
            <MdSave size={22} color="#fff" />
            <span>SALVAR</span>
          </button>
        </span>
      </header>

      <Content>
        <Form onSubmit={handleSubmit}>
          <Input name="name" label="NOME COMPLETO" placeholder="John Doe" />
          <Input
            name="email"
            type="email"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <span>
            <div>
              <Input name="age" type="number" label="IDADE" />
            </div>
            <div>
              <Input type="number" name="weight" label="PESO (em kg)" />
            </div>
            <div>
              <Input name="height" type="number" label="ALTURA (em metros)" />
            </div>
          </span>
        </Form>
      </Content>
    </Container>
  );
}
