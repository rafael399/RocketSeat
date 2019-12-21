import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const LogoText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #ee4d64;
  margin-top: 10px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 20px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 45px;
  padding-left: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
