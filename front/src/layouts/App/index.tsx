import React, { VFC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
const Login = loadable(() => import('@pages/login'));
const Signup = loadable(() => import('@pages/signup'));
const Workspace = loadable(() => import('@pages/workspace'));

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
