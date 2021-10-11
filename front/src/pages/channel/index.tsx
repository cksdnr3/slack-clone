import Loading from '@components/Loading';
import Workspace from '@layouts/Workspace';
import React, { VFC } from 'react';
import { Container, Header } from '@pages/Channel/styles';

interface ChannelProps {}

const Channel: VFC<ChannelProps> = () => {
  return (
    <Container>
      <Header>
        <span>#channel</span>
        <div className="header-right">
          <span>5</span>
          <button
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          ></button>
        </div>
      </Header>
    </Container>
  );
};

export default Channel;
