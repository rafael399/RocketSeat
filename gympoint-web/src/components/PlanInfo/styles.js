import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto 0;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 155px;

        width: 140px;
        height: 35px;

        color: #fff;
        background: #ccc;

        border: none;
        border-radius: 4px;

        font-size: 14px;
        line-height: 19px;
        font-weight: bold;

        &:hover {
          background: ${darken(0.05, '#ccc')};
        }

        svg {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 5px 30px 30px;
  border-radius: 4px;
  position: relative;

  form {
    display: flex;
    flex-direction: column;

    input {
      height: 45px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #444;
    }

    label {
      color: #444;
      font-weight: bold;
      padding-bottom: 8px;
      margin-top: 25px;
    }

    div {
      display: flex;

      div {
        display: flex;
        flex-direction: column;
        width: 33%;

        &:nth-child(2) {
          margin: 0 15px;
        }

        input {
          &:disabled {
            background: #f5f5f5;
            border: 1px solid #ddd;
          }
        }
      }
    }

    button {
      position: absolute;
      top: -55px;
      right: 0px;

      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 15px;

      width: 140px;
      height: 35px;

      color: #fff;
      background: #ee4d64;

      border: none;
      border-radius: 4px;

      font-size: 14px;
      line-height: 19px;
      font-weight: bold;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }

      svg {
        margin-right: 5px;
      }
    }

    span {
      margin: 0;
      color: #fb6f91;
      font-weight: bold;
    }
  }
`;
