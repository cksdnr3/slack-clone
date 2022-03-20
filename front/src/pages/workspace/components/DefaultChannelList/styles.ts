import styled from '@emotion/styled';

export namespace DefaultChannelListStyle {
  export const Wrapper = styled.div`
    margin-top: 10px;
  `;

  export const OpenTooltipsMenuButton = styled.div`
    ${({ theme }) => theme.flexSet({ align: 'center' })}
    padding-left: 16px;
    height: 28px;
  `;
}
