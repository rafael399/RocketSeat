import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, formatDistanceToNow } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

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

function Orders({ navigation, isFocused }) {
  const [orders, setOrders] = useState([]);
  const studentId = useSelector(state => state.student.student.id);

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

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused]);

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
            keyExtractor={helpOrder => String(helpOrder.id)}
            renderItem={({ item: helpOrder }) => (
              <HelpOrderItem
                onPress={() =>
                  navigation.navigate('AnsweredOrder', { helpOrder })
                }>
                <HelpOrderHeader>
                  <HelpOrderTitle>
                    <Icon
                      name={
                        helpOrder.answered
                          ? 'check-box'
                          : 'check-box-outline-blank'
                      }
                      size={22}
                      color={helpOrder.answered ? '#42CB59' : '#999'}
                    />
                    <OrderAnswered answered={helpOrder.answered}>
                      {helpOrder.answered ? 'Respondido' : 'Sem Resposta'}
                    </OrderAnswered>
                  </HelpOrderTitle>
                  <HelpOrderDate>{helpOrder.date}</HelpOrderDate>
                </HelpOrderHeader>
                <HelpOrderDescription numberOfLines={3}>
                  {helpOrder.question}
                </HelpOrderDescription>
              </HelpOrderItem>
            )}
          />
        </Content>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Orders);
