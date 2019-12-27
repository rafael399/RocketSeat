import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Content = styled.View`
  margin: 75px 20px 0;
`;

// export const Form = styled.View`
//   /* align-self: stretch; */
// `;

export const FormInput = styled.TextInput`
  height: 300px;
  background: #fff;

  font-size: 16px;
  line-height: 21px;
  color: #999;

  border: 1px solid #ddd;
  border-radius: 4px;

  padding-left: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
