import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1380px;
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
    }
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  table {
    width: 100%;
    border-collapse: collapse;

    tr {
      height: 50px;

      &:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }
    }

    th {
      font-size: 16px;
      text-align: center;

      &:first-of-type {
        text-align: left;
      }

      &:nth-child(3) {
        text-align: center;
      }
    }

    td {
      color: #666;
      text-align: center;

      .deleted {
        color: red;
      }

      &:first-of-type {
        text-align: left;
      }

      &:nth-child(3) {
        text-align: center;
      }

      &:last-child {
        text-align: right;

        a {
          font-size: 15px;
          color: #4d85ee;
        }

        button {
          border: none;
          margin-left: 25px;
          color: #de3b3b;
        }
      }
    }
  }
`;
