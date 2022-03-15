import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { Input } from '@pages/signup/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { Form } from '@pages/workspace/components/CreateWorkspaceForm/styles';
import { Content, Title, Description, Label, PublicCheck, Footer, Button, Yellow, Check } from './styles';
import { workspaceAPI } from '@apis/workspaces';

interface CreateChannelFormProps {
  onCloseModal: () => void;
}

const CreateChannelForm: FC<CreateChannelFormProps> = ({ onCloseModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const { workspace } = useParams<{ workspace: string }>();
  const { mutate } = useSWRConfig();

  const onCreateChannel = useCallback(
    async (e: MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const result = await workspaceAPI.post.createChannel(
          { string: { workspace }, params: {} },
          { name: newChannel },
        );
        await mutate(`/api/workspaces/${workspace}/channels`, result);
        onCloseModal();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data);
        }
      }
    },
    [newChannel],
  );

  useEffect(() => {
    return () => {
      setNewChannel('');
    };
  }, []);

  return (
    <Form onSubmit={onCreateChannel}>
      <Title>
        <h1>채널 생성</h1>
      </Title>
      <Content>
        <Description>
          채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를 중심으로 구성하는 것이 가장 좋습니다.
        </Description>
        <br />
        <Label style={{ textAlign: 'left' }}>
          <strong>이름</strong>
        </Label>
        <Input id="workspace" value={newChannel} onChange={onChangeNewChannel} placeholder="# 예: 플랜 예산" />
        <br />
        <Label style={{ textAlign: 'left' }}>
          <span>
            <strong> 설명 </strong>
            (옵션)
          </span>
        </Label>
        <Input id="workspace" value={description} onChange={onChangeDescription} />
        <br />
        <PublicCheck>
          <div style={{ textAlign: 'left' }}>
            <strong>비공개로 만들기</strong>
            <p style={{ margin: 0, width: '76%' }}>
              채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는 참여할 수 있습니다.
            </p>
          </div>
        </PublicCheck>
      </Content>
      <Footer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Check type="checkbox" />
          <div>{workspace} 외부 공유</div>
          <Yellow>프리미엄</Yellow>
        </div>
        <Button type="submit">생성</Button>
      </Footer>
    </Form>
  );
};

export default CreateChannelForm;
