import { CollapseButton, CollaptedChannels, HoverWhite } from '@components/DMList/stylest';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';

interface ChannelListProps {
  user?: IUser;
}

const ChannelList: FC<ChannelListProps> = ({ user }) => {
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('일반');
  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();

  const { data: channels } = useSWR<IChannel[]>(user ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onCollapseButton = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  console.log(channel);
  console.log(workspace);

  return (
    <>
      <HoverWhite collapse={channelCollapse}>
        <h2 style={{ cursor: 'pointer' }} onClick={onCollapseButton}>
          <CollapseButton collapse={channelCollapse}>
            <FontAwesomeIcon icon={faCaretDown} />
          </CollapseButton>
          <span>Channels</span>
        </h2>
        {!channelCollapse &&
          channels?.map((c) => {
            return (
              <NavLink key={c.name} activeClassName="selected" to={`/workspace/${workspace}/channel/${c.name}`}>
                <span># {c.name}</span>
              </NavLink>
            );
          })}
      </HoverWhite>
    </>
  );
};

export default ChannelList;
