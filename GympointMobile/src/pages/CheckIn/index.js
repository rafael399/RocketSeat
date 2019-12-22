import React from 'react';
import { Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function CheckIn() {
  return <Container />;
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person-pin" size={22} color={tintColor} />
  ),
};
