import React, { useState } from 'react';
// import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import Button from '~/components/Button';

import {
  Container,
  Content,
  HelpOrderList,
  HelpOrderItem,
  HelpOrderHeader,
  HelpOrderTitle,
  OrderAnswered,
  HelpOrderDate,
  HelpOrderDescription,
} from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      answered: true,
      date: 'Hoje as 14h',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur veniam modi non pariatur, porro, unde similique, sequi a voluptas ea obcaecati quas delectus fuga repudiandae excepturi eveniet blanditiis explicabo dolorem?',
    },
    {
      id: 2,
      answered: false,
      date: 'Hoje as 14h',
      desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur veniam modi non pariatur, porro, unde similique, sequi a voluptas ea obcaecati quas delectus fuga repudiandae excepturi eveniet blanditiis explicabo dolorem?',
    },
  ]);

  function handleNewHelpOrder() {}

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <Button onPress={handleNewHelpOrder}>Novo pedido de auxílio</Button>

          <HelpOrderList
            data={orders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <HelpOrderItem>
                <HelpOrderHeader>
                  <HelpOrderTitle>
                    <Icon
                      name={
                        item.answered ? 'check-box' : 'check-box-outline-blank'
                      }
                      size={22}
                      color={item.answered ? '#42CB59' : '#999'}
                    />
                    <OrderAnswered answered={item.answered}>
                      {item.answered ? 'Respondido' : 'Sem Resposta'}
                    </OrderAnswered>
                  </HelpOrderTitle>
                  <HelpOrderDate>{item.date}</HelpOrderDate>
                </HelpOrderHeader>
                <HelpOrderDescription numberOfLines={3}>
                  {item.desc}
                </HelpOrderDescription>
              </HelpOrderItem>
            )}
          />
        </Content>
      </Container>
    </Background>
  );
}
