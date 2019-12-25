import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
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
  CheckInList,
  CheckInItem,
  CheckInTitle,
  CheckInDate,
} from './styles';

export default function CheckIn() {
  const [checkIns, setCheckIns] = useState([]);
  const studentId = useSelector(state => state.student.student.id);

  async function loadCheckIns() {
    const response = await api.get(`students/${studentId}/checkins`);

    const checkins = response.data.map(checkin => {
      return {
        ...checkin,
        date: formatDistanceToNow(parseISO(checkin.created_at), {
          locale: pt,
          addSuffix: true,
          includeSeconds: true,
        }),
      };
    });

    setCheckIns(checkins);
  }

  useEffect(() => {
    loadCheckIns();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNewCheckIn() {
    async function checkIn() {
      try {
        await api.post(`students/${studentId}/checkins`);

        loadCheckIns();

        Alert.alert('Sucesso', 'Check-in realizado com sucesso');
      } catch (err) {
        Alert.alert(
          'Falha',
          'O check-in não pôde ser realizado. Verifique se você já fez 5 check-ins nos últimos 7 dias'
        );
      }
    }

    checkIn();
  }

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <Button onPress={handleNewCheckIn}>Novo check-in</Button>

          <CheckInList
            data={checkIns}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CheckInItem>
                <CheckInTitle>Check-in #{item.id}</CheckInTitle>
                <CheckInDate>{item.date}</CheckInDate>
              </CheckInItem>
            )}
          />
        </Content>
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person-pin" size={22} color={tintColor} />
  ),
};
