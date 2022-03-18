import styled from '@emotion/styled';

export namespace DirectMessageStyle {
  export const Wrapper = styled.div`
    ${({ theme }) => theme.flexSet({ direction: 'column', wrap: 'wrap' })}
    height: calc(100vh - 38px);
    position: relative;
    flex: 1;
  `;

  export const Header = styled.header`
    ${({ theme }) => theme.flexSet({ align: 'center' })};
    height: 50px;
    width: 100%;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 1px 0 var(--saf-0);
    padding: 20px 16px 20px 20px;
    font-weight: bold;
    & img {
      margin-right: 5px;
    }
  `;

  export const DragOver = styled.div`
    ${({ theme }) => theme.flexSet({ align: 'center', justify: 'center' })}
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100% - 64px);
    background: white;
    opacity: 0.7;
    font-size: 40px;
  `;
}
