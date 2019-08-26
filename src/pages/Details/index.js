import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import auth from '~/config/auth';

import { store } from '~/store';

import {
  Container,
  CharacterDetails,
  SeriesListTitle,
  SeriesList,
} from './styles';

export default function Details({ match }) {
  const [character, setCharacter] = useState({
    thumbnail: { path: '', extension: '' },
    series: { items: [] },
  });
  const [loading, setLoading] = useState(true);

  const charactersStore = store.getState().characters;

  useEffect(() => {
    async function loadCharacter() {
      try {
        const response = await api.get(`characters/${match.params.id}`, {
          params: {
            ts: auth.ts,
            apikey: auth.apiKey,
            hash: auth.apiHash,
          },
        });

        const charResponse = response.data.data.results[0];

        if (charactersStore.length > 0) {
          const characterStoreIndex = charactersStore.findIndex(
            p => p.id === String(charResponse.id)
          );

          if (characterStoreIndex >= 0) {
            charResponse.name = charactersStore[characterStoreIndex].name;
            charResponse.description =
              charactersStore[characterStoreIndex].description;
            charResponse.thumbnail =
              charactersStore[characterStoreIndex].thumbnail;
          } else {
            charResponse.thumbnail = `${charResponse.thumbnail.path}/portrait_uncanny.${charResponse.thumbnail.extension}`;
          }
        } else {
          charResponse.thumbnail = `${charResponse.thumbnail.path}/portrait_uncanny.${charResponse.thumbnail.extension}`;
        }

        setCharacter(charResponse);
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        // console.tron.log(err);
        history.push('/');
      } finally {
        setLoading(false);
      }
    }
    loadCharacter();
  }, [match, charactersStore]);

  return (
    !loading && (
      <Container>
        <CharacterDetails>
          <img src={character.thumbnail} alt="img-preview" />
          <div>
            <strong className="name">{character.name}</strong>
            <p className="description">{character.description}</p>
            <Link to={`/edit/${character.id}`}>Editar</Link>
          </div>
        </CharacterDetails>
        <SeriesListTitle>Séries</SeriesListTitle>
        <hr />
        <SeriesList data-testid="serie-list">
          {character.series.items.map(item => (
            <li key={item.name}>{item.name}</li>
          ))}
        </SeriesList>
      </Container>
    )
  );
}

Details.propTypes = {
  match: PropTypes.shape().isRequired,
};
