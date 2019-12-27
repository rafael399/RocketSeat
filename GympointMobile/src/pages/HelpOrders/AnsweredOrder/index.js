import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Content,
  Wrapper,
  OrderHeader,
  HeaderTitle,
  QuestionDate,
  TextBox,
} from './styles';

export default function AnsweredOrder({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <Wrapper>
            <OrderHeader>
              <HeaderTitle>PERGUNTA</HeaderTitle>
              <QuestionDate>{helpOrder.date}</QuestionDate>
            </OrderHeader>
            <TextBox active>{helpOrder.question}</TextBox>
          </Wrapper>
          <Wrapper>
            <OrderHeader>
              <HeaderTitle>RESPOSTA</HeaderTitle>
            </OrderHeader>
            <TextBox active={helpOrder.answer !== null}>
              {helpOrder.answer !== null
                ? helpOrder.answer
                : 'Sua pergunta ainda não foi respondida.'}
            </TextBox>
          </Wrapper>
        </Content>
      </Container>
    </Background>
  );
}

AnsweredOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={30} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
