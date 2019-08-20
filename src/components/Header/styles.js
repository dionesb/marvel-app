import styled from 'styled-components';

export const Container = styled.div`
  background: #22262a;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 42px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.5);
    }

    a {
      color: #eee;
      font-size: 24px;
      font-weight: bold;
    }
  }

  form {
    display: flex;
    align-items: center;

    input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #22262a;
      height: 32px;
      padding: 0 5px;
      border-radius: 4px;
      color: #fff;

      &::placeholder {
        color: #999;
      }

      &:focus {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    button {
      margin-left: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #22262a;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;
