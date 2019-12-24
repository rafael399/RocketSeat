import React from 'react';
import { Wrapper, Container, Title, Logo, TitleText } from './styles';

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <TitleText>GYMPOINT</TitleText>
      </Container>
    </Wrapper>
  );
}
