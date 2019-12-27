import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  margin: 75px 20px 0;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 30,
  },
})`
  margin-bottom: 30px;
  margin-top: 20px;
`;

export const HelpOrderItem = styled(TouchableOpacity)`
  flex-direction: column;

  padding: 20px;
  height: 150px;
  margin-bottom: 10px;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const HelpOrderHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

export const HelpOrderTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OrderAnswered = styled.Text`
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  margin-left: 15px;

  font-size: 14px;
  font-weight: bold;
`;

export const HelpOrderDate = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const HelpOrderDescription = styled.Text`
  color: #666;
  line-height: 26px;
`;
