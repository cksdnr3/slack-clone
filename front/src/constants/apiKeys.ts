import { useParams } from 'react-router';

export const apiKeys = () => {
  const { workspace } = useParams<{ workspace: string }>();
  return {
    user: 'http://localhost:3095/api/users',
  };
};
