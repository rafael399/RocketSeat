import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Gympoint" />
            <strong>GYMPOINT</strong>
          </Link>

          <span>
            <Link to="/students" className="active">
              Alunos
            </Link>
            <Link to="/plans">Planos</Link>
            <Link to="/registration">Matrículas</Link>
            <Link to="/help">Pedidos de Auxílio</Link>
          </span>
        </nav>

        <aside>
          <strong>Rafael Montenegro</strong>
          <button type="button">sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
