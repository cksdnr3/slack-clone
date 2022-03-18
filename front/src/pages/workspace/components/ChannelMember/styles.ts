import styled from '@emotion/styled';

export const ChannelMemberWrapper = styled.div`
  padding-top: 16px;
`;

export const ItemBox = styled.div`
  padding: 0 16px;
  height: 60px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: rgba(${({ theme }) => theme.palette.white[200]}, 0.8);
  }
`;
