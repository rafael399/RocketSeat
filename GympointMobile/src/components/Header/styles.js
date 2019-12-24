import styled from 'styled-components/native';
import logo from '~/assets/logo.png';

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  flex-direction: row;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 20px;
  justify-content: center;
  align-self: center;
  background: #fff;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  margin-top: 50px;
  width: 35px;
  height: 18px;
`;

export const TitleText = styled.Text`
  color: #ee4e62;
  height: 14px;
  margin-top: 52px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
`;
