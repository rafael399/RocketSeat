import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;

    a {
      display: flex;
      align-items: center;

      img {
        width: 45px;
        height: 23px;
      }

      strong {
        color: #ee4d64;
        font-size: 15px;
        line-height: 20px;
        font-weight: bold;
        margin-left: 12px;
        align-items: center;
      }
    }

    span {
      display: flex;
      align-items: center;
      border-left: 1px solid #ddd;
      margin-left: 30px;

      a:first-of-type {
        margin-left: 30px;
      }

      a {
        text-transform: uppercase;
        font-weight: bold;
        /* color: ${props => (props.active ? '#444' : '#999')}; */
        color: #999;
        margin-right: 22px;
      }

      .active {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 14px;
      line-height: 19px;
      color: #666;
    }

    button {
      border: none;
      text-align: right;
      color: #de3b3b;
      font-size: 14px;
      line-height: 19px;

      &:hover {
          color: ${darken(0.05, '#de3b3b')};
        }
    }
  }
`;
