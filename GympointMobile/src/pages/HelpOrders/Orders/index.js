import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

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

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const studentId = useSelector(state => state.student.student.id);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${studentId}/help-orders`);

      const helpOrders = response.data.map(helpOrder => {
        return {
          ...helpOrder,
          answered: helpOrder.answered_at !== null,
          date: formatDistanceToNow(parseISO(helpOrder.created_at), {
            locale: pt,
            addSuffix: true,
            includeSeconds: true,
          }),
        };
      });

      setOrders(helpOrders);
    }

    loadHelpOrders();
  }, [studentId]);

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <Button onPress={() => navigation.navigate('NewOrder')}>
            Novo pedido de auxílio
          </Button>

          <HelpOrderList
            data={orders}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <HelpOrderItem
                onPress={() => navigation.navigate('AnsweredOrder', { item })}>
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
                  {item.question}
                </HelpOrderDescription>
              </HelpOrderItem>
            )}
          />
        </Content>
      </Container>
    </Background>
  );
}
