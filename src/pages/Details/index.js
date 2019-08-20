import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '~/services/api';

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

  useEffect(() => {
    console.tron.log(match);
    async function loadCharacter() {
      const response = await api.get(`characters/${match.params.id}`, {
        params: {
          ts: '1',
          apikey: 'd14feaabc55ade996eeb51b7a7b57526',
          hash: '4363dd78fbe84f0f61107fb3f916b42c',
        },
      });
      // console.tron.log(response.data.data.results[0]);
      const char = response.data.data.results[0];
      console.tron.log(char);
      setCharacter(char);
    }
    loadCharacter();
  }, [match]);

  return (
    <Container>
      <CharacterDetails>
        <img
          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
          alt={character.name}
        />
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
          <li>{item.name}</li>
        ))}
      </SeriesList>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape().isRequired,
};
