import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  margin: 75px 20px 0;

  padding: 20px 20px 0;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Wrapper = styled.View`
  margin-bottom: 30px;
`;

export const OrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const HeaderTitle = styled.Text`
  font-weight: bold;
  color: #444;
`;

export const QuestionDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const TextBox = styled.Text`
  color: ${props => (props.active ? '#666' : 'red')};

  font-size: 14px;
  font-weight: normal;
`;
