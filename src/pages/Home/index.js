import React from 'react';

import {
  Container,
  CharacterList,
  Pagination,
  PaginationButton,
} from './styles';

export default function Home() {
  return (
    <Container>
      <CharacterList>
        <li>
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_uncanny.jpg"
            alt="Character"
          />
          <span>Character Name</span>
        </li>
        <li>
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16/portrait_uncanny.jpg"
            alt="Character"
          />
          <span>Character Name</span>
        </li>
        <li>
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec/portrait_uncanny.jpg"
            alt="Character"
          />
          <span>Character Name</span>
        </li>
        <li>
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04/portrait_uncanny.jpg"
            alt="Character"
          />
          <span>Character Name</span>
        </li>
        <li>
          <img
            src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny.jpg"
            alt="Character"
          />
          <span>Character Name</span>
        </li>
      </CharacterList>
      <Pagination>
        <PaginationButton>Anterior</PaginationButton>
        <span>1</span>
        <PaginationButton>Próxima</PaginationButton>
      </Pagination>
    </Container>
  );
}
