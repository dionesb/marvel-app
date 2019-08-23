import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import { updateCharacterRequest } from '~/store/modules/characters/actions';

import { Container, Content } from './styles';

export default function Edit({ match }) {
  const [character, setCharacter] = useState({
    thumbnail: { path: '', extension: '' },
    series: { items: [] },
  });
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const charactersStore = useSelector(state => state.characters);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
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
            setNewImage(charResponse.thumbnail);
          } else {
            setNewImage(
              `${charResponse.thumbnail.path}/portrait_uncanny.${charResponse.thumbnail.extension}`
            );
          }
        }

        setCharacter(charResponse);
        setNewName(charResponse.name);
        setNewDescription(charResponse.description);

        setLoading(false);
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        console.tron.log(err);
        setLoading(false);
        history.push('/');
      }
    }

    loadCharacter();
  }, [charactersStore, match]);

  function handleChangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        setNewImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function handleSubmit(data) {
    dispatch(
      updateCharacterRequest({ ...data, id: character.id, thumbnail: newImage })
    );
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="thumbnail">
            <img src={newImage} alt={character.name} />
            <Input
              name="thumbnail"
              type="file"
              id="thumbnail"
              accept="images/*"
              onChange={handleChangeImage}
            />
          </label>

          <div>
            <Input
              name="name"
              placeholder="Name"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />
            <Textarea
              name="description"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />
            <button type="submit">
              {loading ? 'Carregando...' : 'Salvar'}
            </button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape().isRequired,
};
