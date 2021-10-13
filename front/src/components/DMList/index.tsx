import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { CollapseButton, HoverWhite } from './stylest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface ChannelListProps {
  user?: IUser;
}

const DMList: FC<ChannelListProps> = ({ user }) => {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: member } = useSWR<IUserWithOnline[]>(user ? `/api/workspaces/${workspace}/members` : null, fetcher);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const onCollapseButton = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <HoverWhite collapse={channelCollapse}>
        <h2 style={{ cursor: 'pointer' }} onClick={onCollapseButton}>
          <CollapseButton collapse={channelCollapse}>
            <FontAwesomeIcon icon={faCaretDown} />
          </CollapseButton>
          <span>Direct Messages</span>
        </h2>
        {!channelCollapse &&
          member?.map((m) => {
            const isOnline = onlineList.includes(m.id);

            return (
              <NavLink key={m.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${m.id}`}>
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                  aria-hidden="true"
                  data-qa="presence_indicator"
                  data-qa-presence-self="false"
                  data-qa-resence-active="false"
                  data-qa-presence-dnd="false"
                />
                <span>{m.nickname}</span>
                {m.id === user?.id && <span> (나)</span>}
              </NavLink>
            );
          })}
      </HoverWhite>
    </>
  );
};
export default DMList;
