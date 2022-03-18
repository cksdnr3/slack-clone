import styled from '@emotion/styled';

export namespace InviteWorkspaceFormStyle {
  export const InviteLink = styled.div`
    color: rgb(${({ theme }) => theme.main.hilightColor});
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  `;
}
