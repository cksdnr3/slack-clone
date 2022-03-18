import styled from '@emotion/styled';

export const ItemBox = styled.div`
  background: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  border: 1px solid var(--saf-0);
  border-radius: 12px;
  margin: 16px 28px;
`;

export const Wrap = styled.div`
  background: rgb(${({ theme }) => theme.palette.white[200]});
  height: 100%;
  border-radius: 0 0 6px 6px;
`;

export const Item = styled.div`
  text-align: left;
  font-size: 14px;
  padding: 16px 20px;
  --saf-0: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
  box-shadow: inset 0 -1px 0 0 var(--saf-0);
`;
