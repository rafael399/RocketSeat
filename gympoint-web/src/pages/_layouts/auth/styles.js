import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 100%;
  max-width: 360px;
  text-align: center;
  align-items: center;
  padding: 50px;
  border-radius: 4px;

  img {
    width: 100px;
    height: 50px;
  }

  strong {
    color: #ee4d64;
    font-size: 29px;
    line-height: 39px;
    margin-top: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    label {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: left;
      margin-top: 20px;
      font-weight: bold;
    }

    input {
      width: 300px;
      height: 45px;
      margin-top: 12px;
      border-radius: 4px;
      border: 1px solid #ddd;
      padding: 0 3px 0 15px;
    }

    span {
      color: #ee4d64;
    }

    button {
      width: 300px;
      height: 45px;
      margin-top: 15px;
      background: #ee4d64;
      color: #fff;
      font-size: 16px;
      line-height: 21px;
      font-weight: bold;
      border-radius: 4px;
      border: none;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
