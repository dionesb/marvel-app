import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin-top: 30px;

  form {
    width: 100%;
    display: flex;

    label {
      cursor: pointer;

      &:hover[for='thumbnail'] {
        opacity: 0.7;
      }

      img {
        width: 300px;
        height: 450px;
        border-radius: 4px;
        background: #eee;
        object-fit: cover;
      }

      input {
        display: none;
      }
    }

    div {
      margin-left: 25px;
      width: 100%;
      display: flex;
      flex-direction: column;

      label {
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      input {
        margin-top: 5px;
        margin-bottom: 15px;
        height: 45px;
        border: 1px solid #333;
        border-radius: 4px;
        padding: 0 10px;
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }

      textarea {
        margin-top: 5px;
        height: 150px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
      }

      button {
        margin-top: 15px;
        border: 0;
        border-radius: 4px;
        background: #e92f25;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        align-self: center;
      }
    }
  }
`;
