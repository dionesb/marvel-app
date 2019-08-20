import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const CharacterList = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  li {
    display: flex;
    flex-direction: column;
    text-align: center;

    img {
      align-self: center;
      max-width: 284px;
      border-radius: 4px;
    }

    span {
      margin-top: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #22262a;
    }
  }
`;

export const Pagination = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    padding: 0 10px;
    font-size: 20px;
  }
`;

export const PaginationButton = styled.button`
  border: 1px solid #22262a;
  background: #fff;
  width: 95px;
  padding: 10px 0;
  border-radius: 4px;
  color: #22262a;
`;
