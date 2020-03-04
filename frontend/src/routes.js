import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';

import New from './pages/component/New';
import Subscribe from './pages/Subscribe';

function Routes () {
  return (
    <Switch>
      <Route exact path="/feed/:id" component={Main} />
      <Route path="/new" component={New} />
      <Route path="/subscribe/news" component={Subscribe} />
    </Switch>
  )
};

export default Routes;

