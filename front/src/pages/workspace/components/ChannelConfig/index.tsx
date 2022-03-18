import Modal from '@components/Modal';
import useToggle from '@hooks/useToggle';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ChannelInformation from '../ChannelInfo';
import ChannelMember from '../ChannelMember';
import InviteChannelForm from '../InviteChannelForm';
import { ChannelConfigStyle } from './styles';

const categories = ['정보', '멤버', '통합', '설정'];

const ChannelConfig = () => {
  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();

  const { data: channelMembers } = useSWR<IUser[]>(`/api/workspaces/${workspace}/channels/${channel}/members`, fetcher);

  const [currentCategory, setCurrentCategory] = useState('정보');

  const onClickCategory = useCallback((c) => {
    setCurrentCategory(c);
  }, []);

  const onClickInviteChannel = useCallback(() => {}, []);

  return (
    <>
      <ChannelConfigStyle.Wrapper>
        <ChannelConfigStyle.ChannelModalHeader>
          <ChannelConfigStyle.Title>
            <h1 style={{ fontSize: 20 }}>#{channel}</h1>
          </ChannelConfigStyle.Title>
          <div style={{ display: 'flex', margin: '12px 0 8px 28px' }}>
            <ChannelConfigStyle.GrayBanner>알림 활성화</ChannelConfigStyle.GrayBanner>
            <ChannelConfigStyle.DarkGrayBanner style={{ marginLeft: 15 }}>통화 시작</ChannelConfigStyle.DarkGrayBanner>
          </div>
          <ChannelConfigStyle.Category style={{ display: 'flex', paddingLeft: '28px' }}>
            {categories.map((c) => (
              <ChannelConfigStyle.CategoryButton
                select={currentCategory === c}
                key={c}
                onClick={() => onClickCategory(c)}
              >
                {c === '멤버' ? `${c} ${channelMembers?.length}` : c}
              </ChannelConfigStyle.CategoryButton>
            ))}
          </ChannelConfigStyle.Category>
        </ChannelConfigStyle.ChannelModalHeader>
        <ChannelConfigStyle.ChannelModalContent>
          {currentCategory === '정보' && <ChannelInformation />}
          {currentCategory === '멤버' && <ChannelMember />}
        </ChannelConfigStyle.ChannelModalContent>
      </ChannelConfigStyle.Wrapper>
    </>
  );
};

export default ChannelConfig;
