import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export namespace SidebarStyle {
  export const Channels = styled.nav`
    display: inline-flex;
    flex-direction: column;
    background: #3f0e40;
    width: 260px;
    color: rgb(188, 171, 188);
    vertical-align: top;
  `;

  export const WorkspaceButton = styled.button`
    display: inline-block;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: rgb(${({ theme }) => theme.palette.white[700]});
    border: 1px solid rgb(${({ theme }) => theme.main.backgroundColor});
    margin: 0px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(${({ theme }) => theme.palette.white[100]});
    cursor: pointer;
  `;

  export const MenuScroll = styled.div`
    height: calc(100vh - 102px);
    overflow-y: auto;
  `;

  export const NavLinkWrapper = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 0 26px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;

    &.selected {
      color: white;
    }
  `;

  export const SidebarToggle = styled.div`
    height: 36px;
    line-height: 36px;
    margin: 0;
    padding: 0 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
    cursor: pointer;
  `;
}
