import React from 'react';
import { useParams } from 'react-router-dom';
import { faLink, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultChannelListStyle } from './styles';
import { SidebarStyle } from '@pages/workspace/layouts/sidebar/style';

const DefaultChannelList = () => {
  const { workspace } = useParams<{ workspace: string }>();

  return (
    <DefaultChannelListStyle.Wrapper>
      <SidebarStyle.NavLinkWrapper style={{ paddingLeft: 16 }} to={`/workspace/${workspace}/slack-connect`}>
        <FontAwesomeIcon icon={faLink} style={{ marginRight: '5px' }} />
        <span>Slack Connect</span>
      </SidebarStyle.NavLinkWrapper>
      <DefaultChannelListStyle.OpenTooltipsMenuButton>
        <FontAwesomeIcon icon={faEllipsisV} style={{ marginRight: '10px' }} />
        <span>Slack 찾아보기</span>
      </DefaultChannelListStyle.OpenTooltipsMenuButton>
    </DefaultChannelListStyle.Wrapper>
  );
};

export default DefaultChannelList;
