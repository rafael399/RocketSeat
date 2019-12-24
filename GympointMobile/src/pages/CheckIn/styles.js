import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  margin: 75px 20px 0;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 30,
  },
})`
  margin-bottom: 30px;
`;

export const CheckInItem = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
  height: 45px;
  margin-bottom: 10px;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const CheckInTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const CheckInDate = styled.Text`
  color: #666;
`;
