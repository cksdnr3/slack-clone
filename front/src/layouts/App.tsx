import React, { VFC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
const Login = loadable(() => import('@pages/login'));
const Signup = loadable(() => import('@pages/signup'));
const Channel = loadable(() => import('@pages/channel'));

const App: VFC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/workspaces/channel" component={Channel} />
    </Switch>
  );
};

export default App;
