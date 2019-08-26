import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';
import auth from '~/config/auth';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        const params = {
          ts: auth.ts,
          apikey: auth.apiKey,
          hash: auth.apiHash,
          offset: pageNumber * 6,
          limit: 6,
        };

        if (search !== '') {
          params.nameStartsWith = search;
        }

        const response = await api.get('characters', {
          params,
        });

        if (response.data.data.results.length > 0) {
          const charactersUpdated = response.data.data.results.map(result => {
            return {
              ...result,
              thumbnail: `${result.thumbnail.path}/portrait_uncanny.${result.thumbnail.extension}`,
            };
          });

          setCharacters(charactersUpdated);
        } else {
          dispatch(pagePreview());
        }
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        // console.tron.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [dispatch, pageNumber, search]);

  function previewPage() {
    dispatch(pagePreview());
  }

  function nextPage() {
    dispatch(pageNext());
  }

  function handleSearch(s) {
    dispatch(searchRequest(s));
  }

  function updateCharacter(character) {
    const index = charactersStore.findIndex(p => p.id === String(character.id));
    if (index >= 0) {
      return {
        ...character,
        name: charactersStore[index].name,
        description: charactersStore[index].description,
        thumbnail: charactersStore[index].thumbnail,
      };
    }
    return character;
  }

  return (
    <Container>
      <LetterList>
        <li key="A">
          <button type="submit" onClick={() => handleSearch('A')}>
            A
          </button>
        </li>
        <li key="B">
          <button type="submit" onClick={() => handleSearch('B')}>
            B
          </button>
        </li>
        <li key="C">
          <button type="submit" onClick={() => handleSearch('C')}>
            C
          </button>
        </li>
        <li key="D">
          <button type="submit" onClick={() => handleSearch('D')}>
            D
          </button>
        </li>
        <li key="E">
          <button type="submit" onClick={() => handleSearch('E')}>
            E
          </button>
        </li>
        <li key="F">
          <button type="submit" onClick={() => handleSearch('F')}>
            F
          </button>
        </li>
        <li key="G">
          <button type="submit" onClick={() => handleSearch('G')}>
            G
          </button>
        </li>
        <li key="H">
          <button type="submit" onClick={() => handleSearch('H')}>
            H
          </button>
        </li>
        <li key="I">
          <button type="submit" onClick={() => handleSearch('I')}>
            I
          </button>
        </li>
        <li key="J">
          <button type="submit" onClick={() => handleSearch('J')}>
            J
          </button>
        </li>
        <li key="K">
          <button type="submit" onClick={() => handleSearch('K')}>
            K
          </button>
        </li>
        <li key="L">
          <button type="submit" onClick={() => handleSearch('L')}>
            L
          </button>
        </li>
        <li key="M">
          <button type="submit" onClick={() => handleSearch('M')}>
            M
          </button>
        </li>
        <li key="N">
          <button type="submit" onClick={() => handleSearch('N')}>
            N
          </button>
        </li>
        <li key="O">
          <button type="submit" onClick={() => handleSearch('O')}>
            O
          </button>
        </li>
        <li key="P">
          <button type="submit" onClick={() => handleSearch('P')}>
            P
          </button>
        </li>
        <li key="Q">
          <button type="submit" onClick={() => handleSearch('Q')}>
            Q
          </button>
        </li>
        <li key="R">
          <button type="submit" onClick={() => handleSearch('R')}>
            R
          </button>
        </li>
        <li key="S">
          <button type="submit" onClick={() => handleSearch('S')}>
            S
          </button>
        </li>
        <li key="T">
          <button type="submit" onClick={() => handleSearch('T')}>
            T
          </button>
        </li>
        <li key="U">
          <button type="submit" onClick={() => handleSearch('U')}>
            U
          </button>
        </li>
        <li key="V">
          <button type="submit" onClick={() => handleSearch('V')}>
            V
          </button>
        </li>
        <li key="W">
          <button type="submit" onClick={() => handleSearch('W')}>
            W
          </button>
        </li>
        <li key="X">
          <button type="submit" onClick={() => handleSearch('X')}>
            X
          </button>
        </li>
        <li key="Y">
          <button type="submit" onClick={() => handleSearch('Y')}>
            Y
          </button>
        </li>
        <li key="Z">
          <button type="submit" onClick={() => handleSearch('Z')}>
            Z
          </button>
        </li>
      </LetterList>
      <LoadingScreen loading={String(loading)}>
        <div>
          <img src={logo} alt="Logo Screen" />
          <span>Carregando...</span>
        </div>
      </LoadingScreen>
      <CharacterList data-testid="character-list">
        {characters.map(character => {
          const charUpdated = updateCharacter(character);
          return (
            <li key={charUpdated.id}>
              <Link to={`/details/${charUpdated.id}`}>
                <img
                  src={charUpdated.thumbnail}
                  alt={`img-preview-${charUpdated.id}`}
                />
                <span>{charUpdated.name}</span>
              </Link>
            </li>
          );
        })}
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
