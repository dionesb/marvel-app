import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

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
  const charactersStore = useSelector(state => state.characters);

  useEffect(() => {
    console.tron.log(match);
    async function loadCharacter() {
      try {
        const response = await api.get(`characters/${match.params.id}`, {
          params: {
            ts: '1',
            apikey: 'd14feaabc55ade996eeb51b7a7b57526',
            hash: '4363dd78fbe84f0f61107fb3f916b42c',
          },
        });

        const charResponse = response.data.data.results[0];

        if (charactersStore.length > 0) {
          const characterStoreIndex = charactersStore.findIndex(
            p => p.id === charResponse.id
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
        }

        setCharacter(charResponse);
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        console.tron.log(err);
        history.push('/');
      }
    }
    loadCharacter();
  }, [charactersStore, match]);

  return (
    <Container>
      <CharacterDetails>
        <img src={character.thumbnail} alt={character.name} />
        <div>
          <strong>{character.name}</strong>
          <p>{character.description}</p>
          <Link to={`/edit/${character.id}`}>Editar</Link>
        </div>
      </CharacterDetails>
      <SeriesListTitle>Séries</SeriesListTitle>
      <hr />
      <SeriesList>
        {character.series.items.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </SeriesList>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape().isRequired,
};
