import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { pagePreview, pageNext } from '~/store/modules/page/actions';
import { searchRequest } from '~/store/modules/search/actions';

import logo from '~/assets/logo.svg';

import {
  Container,
  LoadingScreen,
  CharacterList,
  Pagination,
  PaginationButton,
  LetterList,
} from './styles';

export default function Home() {
  const search = useSelector(state => state.search.search);
  const pageNumber = useSelector(state => state.page.number);
  const charactersStore = useSelector(state => state.characters);

  const dispatch = useDispatch();

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        const params = {
          ts: '1',
          apikey: 'd14feaabc55ade996eeb51b7a7b57526',
          hash: '4363dd78fbe84f0f61107fb3f916b42c',
          offset: pageNumber * 6,
          limit: 6,
        };

        if (search !== '') {
          params.nameStartsWith = search;
        }

        const response = await api.get('characters', {
          params,
        });

        console.tron.log(response.data);

        if (response.data.data.results.length > 0) {
          const charactersUpdated = response.data.data.results.map(result => {
            const characterIndex = charactersStore.findIndex(
              p => p.id === result.id
            );

            if (characterIndex >= 0) {
              return {
                ...result,
                name: charactersStore[characterIndex].name,
                description: charactersStore[characterIndex].description,
                thumbnail: charactersStore[characterIndex].thumbnail,
              };
            }
            return {
              ...result,
              thumbnail: `${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`,
            };
          });

          setCharacters(charactersUpdated);
        } else {
          dispatch(pagePreview());
        }
        setLoading(false);
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        console.tron.log(err);
        setLoading(false);
      }
    }

    loadCharacters();
  }, [charactersStore, dispatch, pageNumber, search]);

  function previewPage() {
    dispatch(pagePreview());
  }

  function nextPage() {
    dispatch(pageNext());
  }

  function handleSearch(s) {
    dispatch(searchRequest(s));
  }

  return (
    <Container>
      <LetterList>
        <li>
          <a href="#" onClick={() => handleSearch('A')}>
            A
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('B')}>
            B
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('C')}>
            C
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('D')}>
            D
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('E')}>
            E
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('F')}>
            F
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('G')}>
            G
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('H')}>
            H
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('I')}>
            I
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('J')}>
            J
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('K')}>
            K
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('L')}>
            L
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('M')}>
            M
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('N')}>
            N
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('O')}>
            O
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('P')}>
            P
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('Q')}>
            Q
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('R')}>
            R
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('S')}>
            S
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('T')}>
            T
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('U')}>
            U
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('V')}>
            V
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('W')}>
            W
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('X')}>
            X
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('Y')}>
            Y
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleSearch('Z')}>
            Z
          </a>
        </li>
      </LetterList>
      <LoadingScreen loading={loading}>
        <div>
          <img src={logo} alt="Logo Screen" />
          <span>Carregando...</span>
        </div>
      </LoadingScreen>
      <CharacterList>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/details/${character.id}`}>
              <img src={character.thumbnail} alt={character.name} />
              <span>{character.name}</span>
            </Link>
          </li>
        ))}
      </CharacterList>
      <Pagination>
        <PaginationButton onClick={() => previewPage()}>
          Anterior
        </PaginationButton>
        <span>{pageNumber + 1}</span>
        <PaginationButton onClick={() => nextPage()}>Próxima</PaginationButton>
      </Pagination>
    </Container>
  );
}
