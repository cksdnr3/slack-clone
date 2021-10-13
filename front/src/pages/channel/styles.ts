import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 38px);
  flex-flow: column;
  position: relative;
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

export const ChannelModalHeader = styled.div``;

export const ChannelModal = styled.div`
  display: flex;
  flex-direction: column;
  height: min(85vh, 820px);
`;

export const GrayBanner = styled.button`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);
  background: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  height: 28px;
  min-width: 56px;
  padding: 0 12px 1px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  --saf-0: rgba(var(--sk_primary_foreground, 29, 28, 29), 0.3);
  border: 1px solid var(--saf-0);
  border-radius: 3px;
`;

export const DarkGrayBanner = styled.button`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 8%);
  background: rgba(var(--sk_foreground_min_solid, 221, 221, 221), 1);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  height: 28px;
  min-width: 56px;
  padding: 0 12px 1px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  --saf-0: rgba(var(--sk_primary_foreground, 29, 28, 29), 0.3);
  border: 1px;
  border-color: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
  border-radius: 3px;
`;

export const Category = styled.div`
  display: block;
  --saf-0: rgba(var(--sk_foreground_low_solid, 221, 221, 221), 1);
  box-shadow: inset 0 -1px 0 0 var(--saf-0);
  z-index: 1;
`;

interface CategoryButtonProps {
  select: boolean;
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  outline: 0;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  box-shadow: ${(props) => props.select && `inset 0 -2px 0 0 #007a5a;`}
  text-decoration: none;
  font-size: 13px;
  line-height: 1.38463;
  font-weight: 400;
  -webkit-tap-highlight-color: transparent;
  background: none;
  border: 0;
  color: rgba(var(--sk_foreground_max_solid, 97, 96, 97), 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  padding: 9px 0;
  margin: 0 8px;
  text-align: center;
  transition: box-shadow 0.125s ease-out;

  &:hover {
    color: black;
  }
`;

export const ChannelModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
