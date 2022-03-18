import styled from '@emotion/styled';

export const Header = styled.header`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 46px;
  letter-spacing: -0.75px;
  margin-top: 50px;
  margin-bottom: 50px;
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

export const LinkContainer = styled.p`
  font-size: 13px;
  color: rgb(${({ theme }) => theme.palette.white[300]});
  margin: 0 auto 8px;
  width: 400px;
  max-width: 400px;
  & a {
    color: rgb(${({ theme }) => theme.main.hilightColor});
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
`;
