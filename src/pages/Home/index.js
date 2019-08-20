import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { pagePreview, pageNext } from '~/store/modules/page/actions';

import {
  Container,
  CharacterList,
  Pagination,
  PaginationButton,
} from './styles';

export default function Home() {
  const search = useSelector(state => state.search.search);
  const page = useSelector(state => state.page.number);

  const dispatch = useDispatch();

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function loadCharacters() {
      const params = {
        ts: '1',
        apikey: 'd14feaabc55ade996eeb51b7a7b57526',
        hash: '4363dd78fbe84f0f61107fb3f916b42c',
        offset: page * 6,
        limit: 6,
      };

      if (search !== '') {
        params.nameStartsWith = search;
      }

      const response = await api.get('characters', {
        params,
      });

      console.tron.log(response.data);
      setCharacters(response.data.data.results);
    }

    loadCharacters();
  }, [page, search]);

  function previewPage() {
    dispatch(pagePreview());
  }

  function nextPage() {
    dispatch(pageNext());
  }

  return (
    <Container>
      <CharacterList>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/details/${character.id}`}>
              <img
                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                alt="Character"
              />
              <span>{character.name}</span>
            </Link>
          </li>
        ))}
      </CharacterList>
      <Pagination>
        <PaginationButton onClick={() => previewPage()}>
          Anterior
        </PaginationButton>
        <span>{page + 1}</span>
        <PaginationButton onClick={() => nextPage()}>Próxima</PaginationButton>
      </Pagination>
    </Container>
  );
}
