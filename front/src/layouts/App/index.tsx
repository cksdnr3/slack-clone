import React, { VFC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { END_POINT } from '@constants/url/END_POINT';

const Login = loadable(() => import('@pages/login'));
const Signup = loadable(() => import('@pages/signup'));
const Workspace = loadable(() => import('@pages/workspace'));

axios.defaults.baseURL = END_POINT;

const App: VFC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
