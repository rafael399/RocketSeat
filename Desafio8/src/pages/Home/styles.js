import styled from 'styled-components/native';

import { darken } from 'polished';

export const Container = styled.View`
  /* background: #191920; */
`;

export const Product = styled.View`
  padding: 10px;
  margin: 15px;
  background-color: #fff;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  color: #333;
  font-size: 16px;
  align-items: center;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  margin: 14px 0;
  font-size: 20px;
  margin-bottom: 14px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  padding: 12px;
  background-color: ${darken(0.03, '#7159c1')};

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0 4px 0 10px;
`;

export const AddButtonText = styled.Text`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
