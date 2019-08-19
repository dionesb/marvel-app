import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';

export default function RouterWrapper({ component: Component, ...rest }) {
  const Layout = DefaultLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouterWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
