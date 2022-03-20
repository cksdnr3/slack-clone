import React, { FC, useCallback, useEffect, useState } from 'react';
import { CollapseButton, HoverWhite } from '@pages/workspace/components/PrivateChannelList/styles';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { SidebarStyle } from '@pages/workspace/layouts/sidebar/style';
import { themeLib } from '@styles/themeLib';

interface ChannelListProps {
  user?: IUser;
}

const PublicChannelList: FC<ChannelListProps> = ({ user }) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(channel);

  const { data: channels } = useSWR<IChannel[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onCollapseButton = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    setCurrentChannel(channel);
  }, [channel]);

  return (
    <HoverWhite collapse={channelCollapse}>
      <SidebarStyle.SidebarToggle onClick={onCollapseButton}>
        <CollapseButton collapse={channelCollapse}>
          <FontAwesomeIcon icon={faCaretDown} />
        </CollapseButton>
        <span>Channels</span>
      </SidebarStyle.SidebarToggle>
      {!channelCollapse ? (
        channels?.map((c) => (
          <SidebarStyle.NavLinkWrapper
            key={c.name}
            onClick={() => setCurrentChannel(c.name)}
            to={`/workspace/${workspace}/channel/${c.name}`}
          >
            <span># {c.name}</span>
          </SidebarStyle.NavLinkWrapper>
        ))
      ) : (
        <SidebarStyle.NavLinkWrapper
          style={{ display: currentChannel === channel ? 'flex' : 'none' }}
          to={`/workspace/${workspace}/channel/${currentChannel}`}
        >
          <span># {currentChannel}</span>
        </SidebarStyle.NavLinkWrapper>
      )}
    </HoverWhite>
  );
};

export default PublicChannelList;
