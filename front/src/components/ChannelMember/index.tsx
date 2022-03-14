import { Input } from '@pages/signup/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { ChannelMemberWrapper, ItemBox } from './styles';
import gravatar from 'gravatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

interface ChannelMemberProps {
  onOpenModal: () => void;
}

const ChannelMember: FC<ChannelMemberProps> = ({ onOpenModal }) => {
  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();
  const { data: channelMembers } = useSWR<IUser[]>(`/api/workspaces/${workspace}/channels/${channel}/members`, fetcher);
  
  return (
    <>
      <ChannelMemberWrapper>
        <ItemBox style={{ paddingTop: 0, paddingBottom: 16 }}>
          <Input style={{ height: '36px', fontWeight: 100, margin: 0 }} placeholder="멤버 찾기" />
        </ItemBox>
        <ItemBox onClick={onOpenModal} style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ color: 'white', background: '#b7e2fc', borderRadius: '4px', fontSize: '29px' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px', height: '100%' }}>사용자 추가</div>
          </div>
        </ItemBox>
      </ChannelMemberWrapper>
      {channelMembers?.map((m) => {
        return (
          <ItemBox key={m.id}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px', height: '100%' }}>
              <img
                src={gravatar.url(m!.email, { s: '29px', d: 'mp' })}
                alt={m?.nickname}
                style={{ height: 36, width: 36, borderRadius: '5px', marginRight: 12 }}
              />
              <div>{m.nickname}</div>
            </div>
          </ItemBox>
        );
      })}
    </>
  );
};

export default ChannelMember;
