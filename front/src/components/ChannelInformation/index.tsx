import React from 'react';

import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { Item, ItemBox, Wrap } from './styles';

const ChannelInformation = () => {
  const { channel, workspace } = useParams<{ channel: string; workspace: string }>();
  const { data: user } = useSWR<IUser>('/api/users', fetcher);
  const { data: channels } = useSWR<IChannel[]>(
    user ? `/api/workspaces/${encodeURIComponent(workspace)}/channels` : null,
    fetcher,
  );

  return (
    <>
      <Wrap>
        <ItemBox>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>채널 이름</span>
              <span style={{ color: 'rgb(0, 103, 163)' }}>편집</span>
            </div>
            <span style={{ color: 'gray', fontWeight: 100 }}>#{channel}</span>
          </Item>
        </ItemBox>
        <ItemBox>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>주제</span>
              <span style={{ color: 'rgb(0, 103, 163)' }}>편집</span>
            </div>
            <span style={{ color: 'gray', fontWeight: 100 }}>주제 추가</span>
          </Item>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>설명</span>
              <span style={{ color: 'rgb(0, 103, 163)' }}>편집</span>
            </div>
            <span style={{ fontWeight: 100 }}>
              이것은 언제나 모두를 포함하게 될 단 하나의 채널로 공지를 올리고 팀 전체의 대화를 나누기에 적합한
              공간입니다.
            </span>
          </Item>
          <Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>작성 날짜</span>
              <span style={{ color: 'rgb(0, 103, 163)' }}>편집</span>
            </div>
            <span style={{ fontWeight: 100 }}>{channels?.find((c) => c.name === channel)?.createdAt}</span>
          </Item>
        </ItemBox>
        <ItemBox>
          <Item>
            <div>
              <span>파일</span>
            </div>
            <span style={{ fontWeight: 100 }}>
              현재 여기에는 표시할 파일이 없습니다! 하지만 메시지 창에 파일을 끌어다 놓아서 이 대화에 추가할 수
              있습니다.
            </span>
          </Item>
        </ItemBox>
        <div style={{ textAlign: 'left', fontWeight: 100, paddingLeft: 48, fontSize: '13px' }}>
          채널 ID: {channels?.find((c) => c.name === channel)?.id}
        </div>
      </Wrap>
    </>
  );
};

export default ChannelInformation;
