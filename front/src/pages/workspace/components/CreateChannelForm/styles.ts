import styled from '@emotion/styled';

export namespace CreateChannelFormStyle {
  export const Title = styled.div`
    color: black;
    padding: 20px 0;
    & > h1 {
      font-weight: 900;
      font-size: 25px;
      line-height: 1.2143;
      margin: 0;
      text-align: left;
    }
  `;

  export const Heading = styled.h1``;

  export const Description = styled.div`
    color: rgb(${({ theme }) => theme.palette.white[600]});
    text-align: left;
  `;

  export const PublicCheck = styled.div`
    ${({ theme }) => theme.flexSet({})}
  `;

  export const Yellow = styled.div`
    margin-left: 15px;
    background: #fcf4da;
    color: #886607;
    font-weight: bold;
    border-radius: 32px;
    border: 1px solid transparent;
    white-space: nowrap;
    max-width: 115px;
    font-size: 12px;
    padding: 4px 12px;
  `;

  export const Check = styled.input`
    box-sizing: border-box;
    display: block;
    flex: none;
    margin: 0 12px 0 0;
    padding: 0 12px;
    cursor: pointer;
    font-size: 18px;
  `;

  export const FooterWrapper = styled.div`
    & > *:not(:first-of-type) {
      margin-top: 7px;
    }
  `;

  export const ToolTips = styled.div`
    ${({ theme }) => theme.flexSet({ align: 'center', justify: 'space-between' })};
  `;

  export const ShareText = styled.div`
    ${({ theme }) => theme.flexSet({ align: 'center' })}
  `;
}
