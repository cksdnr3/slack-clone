import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export namespace WorkspacesStyle {
  export const Wrapper = styled.div`
    width: 65px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: #3f0e40;
    border-top: 1px solid rgb(82, 38, 83);
    border-right: 1px solid rgb(82, 38, 83);
    vertical-align: top;
    text-align: center;
    padding: 15px 0 0;
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
}
