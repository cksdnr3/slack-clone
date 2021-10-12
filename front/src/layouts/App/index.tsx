import React, { VFC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
const Login = loadable(() => import('@pages/Login'));
const Signup = loadable(() => import('@pages/Signup'));
const Workspace = loadable(() => import('@layouts/Workspace'));

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
