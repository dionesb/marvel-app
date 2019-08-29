import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';
import auth from '~/config/auth';

import { store } from '~/store';

import { updateCharacterRequest } from '~/store/modules/characters/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
});

export default function Edit({ match }) {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(true);

  const charactersStore = store.getState().characters;

  const dispatch = useDispatch();

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
            setNewImage(charResponse.thumbnail);
          } else {
            setNewImage(
              `${charResponse.thumbnail.path}/portrait_uncanny.${charResponse.thumbnail.extension}`
            );
          }
        } else {
          setNewImage(
            `${charResponse.thumbnail.path}/portrait_uncanny.${charResponse.thumbnail.extension}`
          );
        }

        setNewName(charResponse.name);
        setNewDescription(charResponse.description);
      } catch (err) {
        toast.error('Não foi possível carregar as informações');
        setLoading(false);
        history.push('/');
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [match.params.id, charactersStore]);

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
      updateCharacterRequest({
        ...data,
        id: match.params.id,
        thumbnail: newImage,
      })
    );
  }

  return (
    !loading && (
      <Container>
        <Content>
          <Form schema={schema} onSubmit={handleSubmit}>
            <label htmlFor="thumbnail">
              <img src={newImage} alt="img-preview" />
              <Input
                name="thumbnail"
                type="file"
                id="thumbnail"
                accept="images/*"
                onChange={handleChangeImage}
              />
            </label>

            <div>
              <label htmlFor="name">Nome</label>
              <Input
                name="name"
                placeholder="Nome do personagem"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <label htmlFor="description">Descrição</label>
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
    )
  );
}

Edit.propTypes = {
  match: PropTypes.shape().isRequired,
};
