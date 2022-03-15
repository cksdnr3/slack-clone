import styled from '@emotion/styled';

export namespace SidebarMenuFormStyle {
  export const WorkspaceModal = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    & h2 {
      padding-left: 20px;
    }
    & > button {
      text-align: left;
      width: 100%;
      height: 28px;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0 24px;
      &:last-of-type {
        margin-bottom: 5px;
      }
      &:hover {
        background: #0067a3;
        color: white;
      }
    }
  `;

  export const WorkspaceModalTop = styled.div`
    display: flex;
    padding: 20px 24px 12px;
  `;
}
