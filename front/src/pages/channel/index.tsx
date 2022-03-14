import React, { useCallback, useState, VFC } from 'react';
import {
  Category,
  CategoryButton,
  ChannelModal,
  ChannelModalContent,
  ChannelModalHeader,
  ChannelName,
  Container,
  DarkGrayBanner,
  GrayBanner,
  Header,
} from '@pages/channel/styles';
import { useParams } from 'react-router';
import Modal from '@components/Modal';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';
import ChannelInformation from '@components/ChannelInformation';
import ChannelMember from '@components/ChannelMember';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@components/CreateChannelForm/styles';
import InviteChannelForm from '@components/InviteChannelForm';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';

interface ChannelProps {}

const category = ['정보', '멤버', '통합', '설정'];

const Channel: VFC<ChannelProps> = () => {
  const [currentCategory, setCurrentCategory] = useState('정보');
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const [showInviteChannel, setShowInviteChannel] = useState(false);
  const [chat, onChangeChat, setChat] = useInput('');

  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();
  const { data: channelMembers } = useSWR<IUser[]>(`/api/workspaces/${workspace}/channels/${channel}/members`, fetcher);

  const onClickChannelMenu = useCallback(() => {
    setShowChannelMenu((prev) => !prev);
    setCurrentCategory('정보');
  }, []);

  const onClickCategory = useCallback((c) => {
    setCurrentCategory(c);
  }, []);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannel((prev) => !prev);
    setShowChannelMenu(false);
  }, []);

  const onSubmitMessage = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    console.log('submit');
    setChat('');
  }, []);

  return (
    <Container>
      <Header>
        <ChannelName onClick={onClickChannelMenu}>
          <div style={{ verticalAlign: 'middle' }}>
            #{channel}
            <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '8px', fontSize: '14px' }} />
          </div>
        </ChannelName>
        <div>5</div>
      </Header>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmit={onSubmitMessage} />
      <Modal show={showChannelMenu} onCloseModal={onClickChannelMenu}>
        <ChannelModal>
          <ChannelModalHeader>
            <Title style={{ padding: '20px 28px 0' }}>
              <h1 style={{ fontSize: 20 }}>#{channel}</h1>
            </Title>
            <div style={{ display: 'flex', margin: '12px 0 8px 28px' }}>
              <GrayBanner>알림 활성화</GrayBanner>
              <DarkGrayBanner style={{ marginLeft: 15 }}>통화 시작</DarkGrayBanner>
            </div>
            <Category style={{ display: 'flex', paddingLeft: '28px' }}>
              {category.map((c) => {
                return (
                  <CategoryButton
                    select={currentCategory === c}
                    key={c}
                    onClick={() => {
                      onClickCategory(c);
                    }}
                  >
                    {c === '멤버' ? `${c} ${channelMembers?.length}` : c}
                  </CategoryButton>
                );
              })}
            </Category>
          </ChannelModalHeader>
          <ChannelModalContent>
            {currentCategory === '정보' && <ChannelInformation />}
            {currentCategory === '멤버' && <ChannelMember onOpenModal={onClickInviteChannel} />}
          </ChannelModalContent>
        </ChannelModal>
      </Modal>
      <Modal show={showInviteChannel} onCloseModal={onClickInviteChannel}>
        <InviteChannelForm onCloseModal={onClickInviteChannel} />
      </Modal>
    </Container>
  );
};

export default Channel;
