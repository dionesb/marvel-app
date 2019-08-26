import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, act, fireEvent } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import { pageNext, pagePreview } from '~/store/modules/page/actions';
import { searchRequest } from '~/store/modules/search/actions';

import Home from '~/pages/Home';

jest.mock('react-redux');

const apiMock = new MockAdapter(api);

const charactersMock = [
  {
    id: 'character_id_1',
    name: 'Character Name 1',
    description: 'Description of character 1',
    thumbnail: { path: 'character_image_1', extension: 'jpg' },
    series: {
      items: [{ name: 'Serie 1' }, { name: 'Serie 2' }, { name: 'Serie 3' }],
    },
  },
  {
    id: 'character_id_2',
    name: 'Character Name 2',
    description: 'Description of character 2',
    thumbnail: { path: 'character_image_2', extension: 'jpg' },
    series: {
      items: [{ name: 'Serie 1' }, { name: 'Serie 2' }, { name: 'Serie 3' }],
    },
  },
];

describe('Home page', () => {
  it('should be able to fetch characters from Api', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
        search: { search: 'startsWith' },
        page: { number: 0 },
      })
    );

    apiMock.onGet('characters').reply(200, {
      data: {
        results: [
          {
            id: charactersMock[0].id,
            name: charactersMock[0].name,
            thumbnail: {
              path: charactersMock[0].thumbnail.path,
              extension: charactersMock[0].thumbnail.extension,
            },
          },
          {
            id: charactersMock[1].id,
            name: charactersMock[1].name,
            thumbnail: {
              path: charactersMock[1].thumbnail.path,
              extension: charactersMock[1].thumbnail.extension,
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    expect(
      component.getByAltText(`img-preview-${charactersMock[0].id}`).src
    ).toEqual(
      `http://localhost/${charactersMock[0].thumbnail.path}/portrait_uncanny.${charactersMock[0].thumbnail.extension}`
    );
    expect(component.getByTestId('character-list')).toContainElement(
      component.getByText(charactersMock[0].name)
    );

    expect(
      component.getByAltText(`img-preview-${charactersMock[1].id}`).src
    ).toEqual(
      `http://localhost/${charactersMock[1].thumbnail.path}/portrait_uncanny.${charactersMock[0].thumbnail.extension}`
    );
    expect(component.getByTestId('character-list')).toContainElement(
      component.getByText(charactersMock[1].name)
    );
  });

  it('should fail when api return error', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
        search: { search: '' },
        page: { number: 0 },
      })
    );

    apiMock.onGet('characters').reply(500);

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    expect(component.getByTestId('character-list').firstChild).toBe(null);
  });

  it('should be able to fetch the next characters from Api when click nextPage button', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
        search: { search: '' },
        page: { number: 0 },
      })
    );

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    apiMock.onGet('characters').reply(200, {
      data: {
        results: [
          {
            id: charactersMock[0].id,
            name: charactersMock[0].name,
            thumbnail: {
              path: charactersMock[0].thumbnail.path,
              extension: charactersMock[0].thumbnail.extension,
            },
          },
          {
            id: charactersMock[1].id,
            name: charactersMock[1].name,
            thumbnail: {
              path: charactersMock[1].thumbnail.path,
              extension: charactersMock[1].thumbnail.extension,
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    fireEvent.click(component.getByText('Próxima'));

    expect(dispatch).toHaveBeenCalledWith(pageNext());
  });

  it('should be able to fetch the preview characters from Api when click previewPage button', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
        search: { search: '' },
        page: { number: 0 },
      })
    );

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    apiMock.onGet('characters').reply(200, {
      data: {
        results: [
          {
            id: charactersMock[0].id,
            name: charactersMock[0].name,
            thumbnail: {
              path: charactersMock[0].thumbnail.path,
              extension: charactersMock[0].thumbnail.extension,
            },
          },
          {
            id: charactersMock[1].id,
            name: charactersMock[1].name,
            thumbnail: {
              path: charactersMock[1].thumbnail.path,
              extension: charactersMock[1].thumbnail.extension,
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    fireEvent.click(component.getByText('Anterior'));

    expect(dispatch).toHaveBeenCalledWith(pagePreview());
  });

  it('should be able te fetch to sorte characters', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
        search: { search: '' },
        page: { number: 0 },
      })
    );

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    apiMock.onGet('characters').reply(200, {
      data: {
        results: [],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    const alphabet = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

    alphabet.forEach(el => {
      fireEvent.click(component.getByText(el));
      expect(dispatch).toHaveBeenCalledWith(searchRequest(el));
    });
  });

  it('should be able update charater from localStorage', async () => {
    useSelector.mockImplementation(cb =>
      cb({
        characters: [
          {
            id: charactersMock[0].id,
            name: `${charactersMock[0].name}_updated`,
            description: `${charactersMock[0].description}_updated`,
            thumbnail: `http://localhost/${charactersMock[0].thumbnail.path}_updated/portrait_uncanny.${charactersMock[0].thumbnail.extension}`,
          },
        ],
        search: { search: '' },
        page: { number: 0 },
      })
    );

    apiMock.onGet('characters').reply(200, {
      data: {
        results: [
          {
            id: charactersMock[0].id,
            name: charactersMock[0].name,
            thumbnail: {
              path: charactersMock[0].thumbnail.path,
              extension: charactersMock[0].thumbnail.extension,
            },
          },
          {
            id: charactersMock[1].id,
            name: charactersMock[1].name,
            thumbnail: {
              path: charactersMock[1].thumbnail.path,
              extension: charactersMock[1].thumbnail.extension,
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Home />
        </Router>
      );
    });

    expect(
      component.getByAltText(`img-preview-${charactersMock[0].id}`).src
    ).toEqual(
      `http://localhost/${charactersMock[0].thumbnail.path}_updated/portrait_uncanny.${charactersMock[0].thumbnail.extension}`
    );
    expect(component.getByTestId('character-list')).toContainElement(
      component.getByText(`${charactersMock[0].name}_updated`)
    );
  });
});
