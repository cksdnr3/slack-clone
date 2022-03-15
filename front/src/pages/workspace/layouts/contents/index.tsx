import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import loadable from '@loadable/component';
import { Chats } from './styles';

const Channel = loadable(() => import('@pages/workspace/components/Channel'));
const DirectMessage = loadable(() => import('@pages/workspace/components/DM'));

const Contents = () => {
  return (
    <Switch>
      <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
      <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
    </Switch>
  );
};

export default Contents;
