import styled from '@emotion/styled';

export const Title = styled.div`
  padding: 20px 0;
  & > h1 {
    font-weight: 900;
    font-size: 25px;
    line-height: 1.2143;
    margin: 0;
    text-align: left;
  }
`;

export const Content = styled.div``;

export const Description = styled.div`
  color: gray;
  text-align: left;
`;

export const Label = styled.div``;

export const PublicCheck = styled.div`
  display: flex;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  color: gray;
`;

export const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  text-align: center;
  white-space: nowrap;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  font-size: 15px;
  height: 36px;
  min-width: 80px;
  padding: 0 12px 1px;
  background: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 0.7);
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 0.75);
  text-shadow: none;
  border-color: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
  background-clip: initial;
  box-shadow: none;
  font-weight: bold;

  &:hover {
    background: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
  }
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
