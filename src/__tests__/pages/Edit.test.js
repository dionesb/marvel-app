import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent, act, wait } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import { updateCharacterRequest } from '~/store/modules/characters/actions';
import Edit from '~/pages/Edit';

import history from '~/services/history';

import { store } from '~/store';

jest.mock('react-redux');

const apiMock = new MockAdapter(api);

describe('Edit page', () => {
  it('should be able to fetch a character from Api', async () => {
    const props = {
      match: { params: { id: 'character_id' } },
    };

    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
      })
    );

    apiMock.onGet('characters/character_id').reply(200, {
      data: {
        results: [
          {
            name: 'Character Name',
            description: 'Description of character',
            thumbnail: { path: 'character_image', extension: 'jpg' },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(<Edit {...props} />);
    });

    const dataURL = component.getByAltText('img-preview').src;
    const name = component.getByLabelText('Nome').value;
    const description = component.getByLabelText('Descrição').value;

    expect(dataURL).toEqual(
      'http://localhost/character_image/portrait_uncanny.jpg'
    );
    expect(name).toEqual('Character Name');
    expect(description).toEqual('Description of character');
  });

  it('should be able to set img thumb', async () => {
    const props = {
      match: { params: { id: 'character_id' } },
    };

    const mockState = {
      characters: [
        {
          id: '1234',
          name: 'Character name updated',
          description: 'Character description updated',
          thumbnail: 'thumbnail_edited.jpg',
        },
      ],
    };

    store.getState = () => mockState;

    apiMock.onGet('characters/character_id').reply(200, {
      data: {
        results: [
          {
            id: 'character_id',
            name: 'Character name',
            description: 'Character description',
            thumbnail: {
              path: 'thumbnail',
              extension: 'jpg',
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(<Edit {...props} />);
    });

    expect(component.getByAltText('img-preview').src).toEqual(
      'http://localhost/thumbnail/portrait_uncanny.jpg'
    );
    expect(component.getByLabelText('Nome').value).toEqual('Character name');
    expect(component.getByText('Character description').textContent).toEqual(
      'Character description'
    );
  });

  it('should be able to set character from localStorage', async () => {
    const props = {
      match: { params: { id: 'character_id' } },
    };

    const mockState = {
      characters: [
        {
          id: 'character_id',
          name: 'Character name updated',
          description: 'Character description updated',
          thumbnail: 'thumbnail_edited/portrait_uncanny.jpg',
        },
      ],
    };

    store.getState = () => mockState;

    apiMock.onGet('characters/character_id').reply(200, {
      data: {
        results: [
          {
            id: 'character_id',
            name: 'Character name',
            description: 'Character description',
            thumbnail: {
              path: 'thumbnail',
              extension: 'jpg',
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(<Edit {...props} />);
    });

    expect(component.getByAltText('img-preview').src).toEqual(
      'http://localhost/thumbnail_edited/portrait_uncanny.jpg'
    );
    expect(component.getByLabelText('Nome').value).toEqual(
      'Character name updated'
    );
    expect(
      component.getByText('Character description updated').textContent
    ).toEqual('Character description updated');
  });

  it('should fail and push to home page when api return error', async () => {
    const props = {
      match: { params: { id: 'character_id' } },
    };

    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
      })
    );

    apiMock.onGet('characters/character_id').reply(500);

    const pushSpy = jest.spyOn(history, 'push');

    await act(async () => {
      render(<Edit {...props} />);
    });

    expect(pushSpy.mock.calls[0]).toEqual(['/']);

    pushSpy.mockRestore();
  });

  it('should be able to save a character', async () => {
    const props = {
      match: { params: { id: 'character_id' } },
    };

    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
      })
    );

    apiMock.onGet('characters/character_id').reply(200, {
      data: {
        results: [
          {
            name: 'Character Name',
            description: 'Description of character',
            thumbnail: { path: 'character_image', extension: 'jpg' },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(<Edit {...props} />);
    });

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const file = new File(['(⌐□_□)'], 'iron_man_image.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(component.getByLabelText('thumbnail'), {
      target: { files: [file] },
    });
    await wait(() => component.getByAltText('img-preview'));

    const dataURL = component.getByAltText('img-preview').src;

    let path = 'data:image/jpeg;base64,KOKMkOKWoV/ilqEp';
    if (dataURL !== path) path = 'character_image/portrait_uncanny.jpg';

    fireEvent.change(component.getByLabelText('Nome'), {
      target: { value: 'Iron Man' },
    });

    fireEvent.change(component.getByLabelText('Descrição'), {
      target: { value: 'Descrição do Irom Man...' },
    });

    await act(async () => {
      fireEvent.submit(component.getByTestId('form'));
    });

    expect(dispatch).toHaveBeenCalledWith(
      updateCharacterRequest({
        id: 'character_id',
        thumbnail: path,
        name: 'Iron Man',
        description: 'Descrição do Irom Man...',
      })
    );
  });
});
