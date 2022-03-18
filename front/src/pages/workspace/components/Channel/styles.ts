import styled from '@emotion/styled';

export namespace ChannelStyle {
  export const Wrapper = styled.div`
    ${({ theme }) => theme.flexSet({ direction: 'column', wrap: 'wrap' })}
    height: calc(100vh - 38px);
    position: relative;
    flex: 1;
  `;

  export const Header = styled.header`
    ${({ theme }) => theme.flexSet({ justify: 'space-between', align: 'center' })};
    height: 50px;
    width: 100%;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 1px 0 var(--saf-0);
    padding: 0 16px;
    font-weight: bold;

    & .header-right {
      ${({ theme }) => theme.flexSet({ justify: 'end', align: 'center' })};
      flex: 1;
    }
  `;

  export const DragOver = styled.div`
    ${({ theme }) => theme.flexSet({ justify: 'center', align: 'center' })};
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100% - 64px);
    background: white;
    opacity: 0.7;
    font-size: 40px;
  `;

  export const Footer = styled;

  export const ChannelName = styled.div`
    ${({ theme }) => theme.flexSet({ justify: 'center', align: 'center' })};
    font-weight: 900;
    font-size: 18px;
    line-height: 1.33334;
    cursor: pointer;

    padding: 4px 8px;
    text-align: center;
    border-radius: 4px;
    &:hover {
      background: rgb(${({ theme }) => theme.palette.white[200]});
    }
  `;
}
