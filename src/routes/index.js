import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '~/pages/Home';
import Edit from '~/pages/Edit';
import Details from '~/pages/Details';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/details/:id" component={Details} />
    </Switch>
  );
}
