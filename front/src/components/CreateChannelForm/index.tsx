import React, { useCallback } from 'react';
import { Button, Input, Label } from '@pages/Signup/styles';
import useInput from '@hooks/useInput';

const CreateChannelForm = () => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const onCreateChannel = useCallback(() => {}, []);

  return (
    <form onSubmit={onCreateChannel}>
      <Label>
        <span>채널 이름</span>
        <Input id="workspace" value={newChannel} onChange={onChangeNewChannel} />
      </Label>
      <Button type="submit">생성하기</Button>
    </form>
  );
};

export default CreateChannelForm;
