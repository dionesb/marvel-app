import React from 'react';

import { render } from '@testing-library/react';

import NoMatch from '~/pages/NoMatch';

describe('NoMatch page', () => {
  it('sholud be able to render', () => {
    render(<NoMatch />);
  });
});
