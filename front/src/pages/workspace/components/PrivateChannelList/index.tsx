import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { CollapseButton, HoverWhite } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import gravatar from 'gravatar';
import { SidebarStyle } from '@pages/workspace/layouts/sidebar/style';

interface ChannelListProps {
  user?: IUser;
}

const PrivateChannelList: FC<ChannelListProps> = ({ user }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: members } = useSWR<IUserWithOnline[]>(user ? `/api/workspaces/${workspace}/members` : null, fetcher);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [currentDmMember, setCurrentDMember] = useState<IUserWithOnline>({
    id: 0,
    nickname: '',
    email: '',
    online: false,
    Workspaces: [],
  });
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const onCollapseButton = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <HoverWhite collapse={channelCollapse}>
      <SidebarStyle.SidebarToggle onClick={onCollapseButton}>
        <CollapseButton collapse={channelCollapse}>
          <FontAwesomeIcon icon={faCaretDown} />
        </CollapseButton>
        <span>Direct Messages</span>
      </SidebarStyle.SidebarToggle>
      {!channelCollapse ? (
        members?.map((m) => {
          const isOnline = onlineList.includes(m.id);

          return (
            <SidebarStyle.NavLinkWrapper
              key={m.id}
              onClick={() => setCurrentDMember(m)}
              to={`/workspace/${workspace}/dm/${m.id}`}
            >
              <img
                src={gravatar.url(m!.email, { s: '20px', d: 'mp' })}
                alt={m?.nickname}
                style={{ height: 20, width: 20, borderRadius: '5px', marginRight: 7 }}
              />
              <span>{m.nickname}</span>
              {m.id === user?.id && <span> (나)</span>}
            </SidebarStyle.NavLinkWrapper>
          );
        })
      ) : (
        <SidebarStyle.NavLinkWrapper
          key={currentDmMember.id}
          style={{ display: 'none' }}
          to={`/workspace/${workspace}/dm/${currentDmMember.id}`}
        >
          <img
            src={gravatar.url(currentDmMember!.email, { s: '20px', d: 'mp' })}
            alt={currentDmMember?.nickname}
            style={{ height: 20, width: 20, borderRadius: '5px', marginRight: 7 }}
          />
          <span>{currentDmMember.nickname}</span>
          {currentDmMember.id === user?.id && <span> (나)</span>}
        </SidebarStyle.NavLinkWrapper>
      )}
    </HoverWhite>
  );
};
export default PrivateChannelList;
