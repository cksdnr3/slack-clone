import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export namespace WorkspaceInfoStyle {
  export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    text-align: left;
    border-top: 1px solid rgb(82, 38, 83);
    border-bottom: 1px solid rgb(82, 38, 83);
    background: transparent;
    padding: 0;
    padding-left: 16px;
    margin: 0;
    color: white;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  `;

  export const WorkspaceName = styled.div`
    font-weight: 800;
  `;
}
