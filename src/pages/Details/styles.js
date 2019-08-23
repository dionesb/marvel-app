import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  hr {
    border: 2px solid #22262a;
    margin-top: 3px;
  }
`;

export const CharacterDetails = styled.div`
  margin-top: 30px;

  display: flex;

  img {
    width: 300px;
    height: 450px;
    border-radius: 4px;
    background: #eee;
    object-fit: cover;
  }

  div {
    margin-left: 25px;

    display: flex;
    flex-direction: column;

    strong {
      font-size: 32px;
      color: #22262a;
    }

    p {
      margin-top: 10px;
      font-size: 18px;
      line-height: 26px;
    }

    a {
      margin-top: 20px;
      background: #e92f25;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      padding: 10px 15px;
      border-radius: 4px;

      align-self: flex-end;

      &:hover {
        background: ${darken(0.08, '#e92f25')};
      }
    }
  }
`;

export const SeriesListTitle = styled.strong`
  margin-top: 30px;
  font-size: 32px;
  color: #22262a;
`;

export const SeriesList = styled.ul`
  margin-top: 10px;
  margin-bottom: 30px;

  li {
    font-size: 18px;
    height: 30px;
  }
`;
