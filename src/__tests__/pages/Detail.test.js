import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, act } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import Details from '~/pages/Details';

import history from '~/services/history';

import { store } from '~/store';

jest.mock('react-redux');

const apiMock = new MockAdapter(api);

const characterMock = {
  id: 'character_id',
  name: 'Character Name',
  description: 'Description of character',
  thumbnail: { path: 'character_image', extension: 'jpg' },
  series: {
    items: [{ name: 'Serie 1' }, { name: 'Serie 2' }, { name: 'Serie 3' }],
  },
};

describe('Detail page', () => {
  it('should be able to fetch a character from Api', async () => {
    const props = {
      match: { params: { id: characterMock.id } },
    };

    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
      })
    );

    apiMock.onGet(`characters/${characterMock.id}`).reply(200, {
      data: {
        results: [
          {
            name: characterMock.name,
            description: characterMock.description,
            thumbnail: {
              path: characterMock.thumbnail.path,
              extension: characterMock.thumbnail.extension,
            },
            series: {
              items: [
                { name: characterMock.series.items[0].name },
                { name: characterMock.series.items[1].name },
                { name: characterMock.series.items[2].name },
              ],
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Details {...props} />
        </Router>
      );
    });

    expect(component.getByAltText('img-preview').src).toEqual(
      `http://localhost/${characterMock.thumbnail.path}/portrait_uncanny.${characterMock.thumbnail.extension}`
    );
    expect(component.getByText(characterMock.name).textContent).toEqual(
      characterMock.name
    );
    expect(component.getByText(characterMock.description).textContent).toEqual(
      characterMock.description
    );

    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[0].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[1].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[2].name)
    );
  });

  it('should be able to set img thumb', async () => {
    const props = {
      match: { params: { id: characterMock.id } },
    };

    const mockState = {
      characters: [
        {
          id: '1234',
          name: `${characterMock.name}_updated`,
          description: `${characterMock.description}_updated`,
          thumbnail: `${characterMock.thumbnail.path}_updated/portrait_uncanny.${characterMock.thumbnail.extension}`,
        },
      ],
    };

    store.getState = () => mockState;

    apiMock.onGet(`characters/${characterMock.id}`).reply(200, {
      data: {
        results: [
          {
            name: characterMock.name,
            description: characterMock.description,
            thumbnail: {
              path: characterMock.thumbnail.path,
              extension: characterMock.thumbnail.extension,
            },
            series: {
              items: [
                { name: characterMock.series.items[0].name },
                { name: characterMock.series.items[1].name },
                { name: characterMock.series.items[2].name },
              ],
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Details {...props} />
        </Router>
      );
    });

    expect(component.getByAltText('img-preview').src).toEqual(
      `http://localhost/${characterMock.thumbnail.path}/portrait_uncanny.${characterMock.thumbnail.extension}`
    );
    expect(component.getByText(characterMock.name).textContent).toEqual(
      characterMock.name
    );
    expect(component.getByText(characterMock.description).textContent).toEqual(
      characterMock.description
    );

    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[0].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[1].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[2].name)
    );
  });

  it('should be able to update characters from localStorage', async () => {
    const props = {
      match: { params: { id: characterMock.id } },
    };

    const mockState = {
      characters: [
        {
          id: characterMock.id,
          name: `${characterMock.name}_updated`,
          description: `${characterMock.description}_updated`,
          thumbnail: `${characterMock.thumbnail.path}_updated/portrait_uncanny.${characterMock.thumbnail.extension}`,
        },
      ],
    };

    store.getState = () => mockState;

    apiMock.onGet(`characters/${characterMock.id}`).reply(200, {
      data: {
        results: [
          {
            id: characterMock.id,
            name: characterMock.name,
            description: characterMock.description,
            thumbnail: {
              path: characterMock.thumbnail.path,
              extension: characterMock.thumbnail.extension,
            },
            series: {
              items: [
                { name: characterMock.series.items[0].name },
                { name: characterMock.series.items[1].name },
                { name: characterMock.series.items[2].name },
              ],
            },
          },
        ],
      },
    });

    let component;
    await act(async () => {
      component = render(
        <Router>
          <Details {...props} />
        </Router>
      );
    });

    expect(component.getByAltText('img-preview').src).toEqual(
      `http://localhost/${characterMock.thumbnail.path}_updated/portrait_uncanny.${characterMock.thumbnail.extension}`
    );
    expect(
      component.getByText(`${characterMock.name}_updated`).textContent
    ).toEqual(`${characterMock.name}_updated`);
    expect(
      component.getByText(`${characterMock.description}_updated`).textContent
    ).toEqual(`${characterMock.description}_updated`);

    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[0].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[1].name)
    );
    expect(component.getByTestId('serie-list')).toContainElement(
      component.getByText(characterMock.series.items[2].name)
    );
  });

  it('should fail and push to home page when api return error', async () => {
    const props = {
      match: { params: { id: characterMock.id } },
    };

    useSelector.mockImplementation(cb =>
      cb({
        characters: [],
      })
    );

    apiMock.onGet(`characters/${characterMock.id}`).reply(500);

    const pushSpy = jest.spyOn(history, 'push');

    await act(async () => {
      render(
        <Router>
          <Details {...props} />
        </Router>
      );
    });

    expect(pushSpy.mock.calls[0]).toEqual(['/']);

    pushSpy.mockRestore();
  });
});
