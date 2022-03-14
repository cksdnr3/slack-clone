import styled from '@emotion/styled';

export const Workspaces = styled.div`
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

export const Channels = styled.nav`
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  width: 260px;
  color: rgb(188, 171, 188);
  vertical-align: top;
  & a {
    padding-left: 36px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;
    &.selected {
      color: white;
    }
  }
  & .bold {
    color: white;
    font-weight: bold;
  }
  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }
  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

export const WorkspaceName = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  line-height: 50px;
  border: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 900;
  font-size: 18px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  padding-left: 16px;
  margin: 0;
  color: white;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

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

export const WorkspaceButton = styled.button`
  display: inline-block;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #515151;
  border: 1px solid #3f0e40;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

export const WorkspaceModalTop = styled.div`
  display: flex;
  padding: 20px 24px 12px;
`;
