import styled from '@emotion/styled';

export namespace SignupStyle {
  export const Header = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
    font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
    font-weight: ${({ theme }) => theme.fonts.weight.bolder};
    font-size: 48px;
    color: rgb(${({ theme }) => theme.palette.white[900]});
    line-height: 46px;
    letter-spacing: -0.75px;
  `;

  export const Error = styled.div`
    color: #e01e5a;
    margin: 8px 0 16px;
    font-weight: bold;
  `;

  export const Success = styled.div`
    color: rgb(${({ theme }) => theme.palette.green[600]});
    font-weight: bold;
  `;

  export const Footer = styled.div`
    width: 100%;
  `;

  export const LinkHighlighter = styled.p`
    font-size: 13px;
    color: rgb(${({ theme }) => theme.palette.white[300]});
    & a {
      color: rgb(${({ theme }) => theme.main.hilightColor});
      text-decoration: none;
      font-weight: ${({ theme }) => theme.fonts.weight.bolder};
      &:hover {
        text-decoration: underline;
      }
    }
  `;
}
