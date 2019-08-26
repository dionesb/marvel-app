import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import { searchRequest } from '~/store/modules/search/actions';
import Header from '~/components/Header';

jest.mock('react-redux');

describe('Header component', () => {
  it('should be able to search', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.change(component.getByTestId('search'), {
      target: { value: 'Iron Man' },
    });
    fireEvent.submit(component.getByTestId('form'));

    expect(dispatch).toHaveBeenCalledWith(searchRequest('Iron Man'));
  });
});
