import React, { FC, MouseEvent, useCallback } from 'react';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { CreateChannelFormStyle } from './styles';
import { workspaceAPI } from '@apis/workspaces';
import { IChannel } from '@typings/db';
import fetcher from '@utils/fetcher';
import Input from '@components/Input';
import Form from '@components/Form';
import Button from '@components/Button';

interface CreateChannelFormProps {
  onCloseModal: () => void;
}

const CreateChannelForm: FC<CreateChannelFormProps> = ({ onCloseModal }) => {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: channels, mutate } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  const { value: newChannel, setValue: setNewChannel, onChange: onChangeNewChannel } = useInput('');
  const { value: description, setValue: setDescription, onChange: onChangeDescription } = useInput('');

  const onCreateChannel = useCallback(
    async (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!channels) return;
      try {
        const response = await workspaceAPI.post.createChannel(
          { string: { workspace }, params: {} },
          { name: newChannel },
        );
        await mutate([...channels, response.data]);
        onCloseModal();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data);
        }
      }
    },
    [newChannel],
  );

  return (
    <Form
      onSubmit={onCreateChannel}
      header={
        <>
          <CreateChannelFormStyle.Heading>채널 생성</CreateChannelFormStyle.Heading>
          <CreateChannelFormStyle.Description>
            채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를 중심으로 구성하는 것이 가장 좋습니다.
          </CreateChannelFormStyle.Description>
        </>
      }
      body={[
        <Input
          key={0}
          value={newChannel}
          setValue={setNewChannel}
          onChange={onChangeNewChannel}
          label="이름"
          placeholder="# 예: 플랜 예산"
        />,
        <Input
          key={1}
          value={description}
          setValue={setDescription}
          onChange={onChangeDescription}
          label="설명 (옵션)"
        />,
      ]}
      footer={
        <CreateChannelFormStyle.FooterWrapper>
          <CreateChannelFormStyle.PublicCheck>
            <div style={{ textAlign: 'left' }}>
              <strong>비공개로 만들기</strong>
              <p style={{ margin: 0, width: '76%' }}>
                채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는 참여할 수 있습니다.
              </p>
            </div>
          </CreateChannelFormStyle.PublicCheck>
          <CreateChannelFormStyle.ToolTips>
            <CreateChannelFormStyle.ShareText>
              <CreateChannelFormStyle.Check type="checkbox" />
              <div>{workspace} 외부 공유</div>
              <CreateChannelFormStyle.Yellow>프리미엄</CreateChannelFormStyle.Yellow>
            </CreateChannelFormStyle.ShareText>
            <Button type="submit" color="gray" text="생성" />
          </CreateChannelFormStyle.ToolTips>
        </CreateChannelFormStyle.FooterWrapper>
      }
    />
  );
};

export default CreateChannelForm;
