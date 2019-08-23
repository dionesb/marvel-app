import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const LetterList = styled.ul`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  li {
    font-size: 18px;
    font-weight: bold;
    padding: 0 10px;
    border-right: 1px solid #000;

    &:first-child {
      border-left: 1px solid #000;
    }

    a:visited {
      color: #000;
    }
  }
`;

export const LoadingScreen = styled.div.attrs(props => ({
  enabled: props.loading,
  disabled: !props.loading,
}))`
  max-width: 900px;
  margin: 30px auto;
  height: 958px;
  width: 100%;
  background: rgba(255, 255, 255, 1);

  position: absolute;
  transition: visibility 0s, opacity 0.2s linear;

  &[disabled] {
    visibility: hidden;
    opacity: 0;
  }

  &[enabled] {
    visibility: visible;
    opacity: 1;
  }

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      height: 45px;
    }

    span {
      margin-top: 10px;
    }
  }
`;

export const CharacterList = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;

  li {
    display: flex;
    flex-direction: column;
    text-align: center;

    a {
      img {
        width: 290px;
        height: 450px;
        border-radius: 4px;
        background: #eee;
        object-fit: cover;
      }

      span {
        margin-top: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #22262a;
      }
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
