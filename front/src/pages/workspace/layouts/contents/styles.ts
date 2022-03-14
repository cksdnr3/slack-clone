import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Chats = styled.div`
  flex: 1;
`;

export const AddButton = styled.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

interface WorkspaceButtonWrapProps {
  select: string;
}

export const LinkWrap = styled(Link)<WorkspaceButtonWrapProps>`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  border: ${(props) => (JSON.parse(props.select) ? '3px solid white;' : '')};
  border-radius: 12px;
  width: 44px;
  height: 44px;

  &:hover {
    border: ${(props) => (JSON.parse(props.select) ? '3px solid white;' : '3px solid rgba(255, 255, 255, 0.3);')};
    border-radius: 12px;
    transition: 0.1s;
  }
`;
