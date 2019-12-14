import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const pathName = window.location.pathname;
  let active;

  switch (pathName) {
    case '/students':
    case '/newStudent':
    case '/editStudent':
      active = 'Student';
      break;
    case '/plans':
    case '/newPlan':
    case '/editPlan':
      active = 'Plan';
      break;
    case '/registration':
    case '/newRegistration':
    case '/editRegistration':
      active = 'Registration';
      break;
    case '/help':
      active = 'Help';
      break;
    default:
      active = '';
      break;
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Gympoint" />
            <strong>GYMPOINT</strong>
          </Link>

          <span>
            <Link
              to="/students"
              className={active === 'Student' ? 'active' : ''}
            >
              Alunos
            </Link>
            <Link to="/plans" className={active === 'Plan' ? 'active' : ''}>
              Planos
            </Link>
            <Link
              to="/registration"
              className={active === 'Registration' ? 'active' : ''}
            >
              Matrículas
            </Link>
            <Link to="/help" className={active === 'Help' ? 'active' : ''}>
              Pedidos de Auxílio
            </Link>
          </span>
        </nav>

        <aside>
          <strong>Rafael Montenegro</strong>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
