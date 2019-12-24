import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

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

  useEffect(() => {
    const checks = [
      {
        id: 1,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 2,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 3,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 4,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 5,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 6,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 7,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 8,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 9,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 10,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 11,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 12,
        check: 'check 1',
        date: 'data1',
      },
      {
        id: 13,
        check: 'check 1',
        date: 'data1',
      },
    ];

    setCheckIns(checks);
  }, []);

  return (
    <Background>
      <Container>
        <Header />

        <Content>
          <Button onPress={() => {}}>Novo check-in</Button>

          <CheckInList
            data={checkIns}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CheckInItem>
                <CheckInTitle>{item.check}</CheckInTitle>
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
