import React, { useCallback, useState, VFC } from 'react';
import { ChannelStyle } from '@pages/workspace/components/Channel/styles';
import { useParams } from 'react-router';
import Modal from '@components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import useToggle from '@hooks/useToggle';
import ChannelConfig from '../ChannelConfig';

interface ChannelProps {}

const Channel: VFC<ChannelProps> = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const { toggle: channelConfigToggle, onToggle: onToggleChannelConfig } = useToggle();

  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();

  const onSubmitMessage = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    <ChannelStyle.Wrapper>
      <ChannelStyle.Header>
        <ChannelStyle.ChannelName onClick={onToggleChannelConfig}>
          <div style={{ verticalAlign: 'middle' }}>
            #{channel}
            <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '14px' }} />
          </div>
        </ChannelStyle.ChannelName>
        <div>5</div>
      </ChannelStyle.Header>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmitMessage} />
      <Modal show={channelConfigToggle} onCloseModal={onToggleChannelConfig}>
        <ChannelConfig />
      </Modal>
    </ChannelStyle.Wrapper>
  );
};

export default Channel;
