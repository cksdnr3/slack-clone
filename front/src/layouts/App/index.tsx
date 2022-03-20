import React, { VFC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { END_POINT } from '@constants/url/END_POINT';
import Login from '@pages/login';
import SignUp from '@pages/signup';
import Workspace from '@pages/workspace';
import Channel from '@pages/workspace/components/Channel';
import DirectMessage from '@pages/workspace/components/DM';

axios.defaults.baseURL = END_POINT;

const App: VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace" element={<Workspace />}>
        <Route path="/workspace/:workspace/channel/:channel" element={<Channel />} />
        <Route path="/workspace/:workspace/dm/:id" element={<DirectMessage />} />
      </Route>
    </Routes>
  );
};

export default App;
