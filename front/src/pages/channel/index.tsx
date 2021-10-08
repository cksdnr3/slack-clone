import Loading from '@components/loading';
import Workspace from '@layouts/Workspace';
import React, { VFC } from 'react';

interface ChannelProps {}

const Channel: VFC<ChannelProps> = () => {
  console.log('channel render');
  return (
    <Workspace>
      <div>채널입니다.</div>
    </Workspace>
  );
};

export default Channel;
