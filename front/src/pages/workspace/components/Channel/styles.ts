import styled from '@emotion/styled';

export namespace ChannelStyle {
  export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 38px);
    flex-flow: column;
    position: relative;
    flex: 1;
  `;

  export const Header = styled.header`
    height: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 1px 0 var(--saf-0);
    padding: 0 16px;
    font-weight: bold;
    align-items: center;

    & .header-right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
    }
  `;

  export const DragOver = styled.div`
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100% - 64px);
    background: white;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  `;

  export const Footer = styled;

  export const ChannelName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 18px;
    line-height: 1.33334;
    cursor: pointer;

    padding: 4px 8px;
    text-align: center;
    border-radius: 4px;
    &:hover {
      background: rgb(239, 239, 239);
    }
  `;
}
