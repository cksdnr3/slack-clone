import styled from '@emotion/styled';

export namespace FormStyle {
  export const Wrapper = styled.form`
    ${({ theme }) => theme.flexSet({ direction: 'column' })}
    padding: 0 28px;
    color: rgb(${({ theme }) => theme.palette.white[600]});
  `;

  export const Header = styled.div`
    padding: 20px 0;
    & > h1 {
      color: rgb(${({ theme }) => theme.palette.white[900]});
      font-weight: ${({ theme }) => theme.fonts.weight.bolder};
      font-size: 21px;
      margin: 0;
      line-height: 1.2143;
      text-align: left;
    }

    & > *:not(:first-of-type) {
      margin-top: 7px;
    }
  `;

  export const Body = styled.div`
    &:not(:last-child) > * > input {
      margin-bottom: 8px;
    }
  `;

  export const Footer = styled.div`
    ${({ theme }) => theme.flexSet({ justify: 'space-between', align: 'center' })}
    padding: 21px 0;
    color: rgb(${({ theme }) => theme.palette.white[600]});
  `;
}
