import React, { VFC } from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from '@pages/login';
import SignUp from '@pages/signup';
import Workspace from '@pages/workspace';
// const Login = loadable(() => import('@pages/login'));
// const Signup = loadable(() => import('@pages/signup'));
// const Workspace = loadable(() => import('@pages/workspace'));

const App: VFC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
