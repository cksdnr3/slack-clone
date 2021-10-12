import styled from '@emotion/styled';
import React from 'react';

const Separator = () => {
  return (
    <Wrapper>
      <Hr />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  line-height: 24px;
  padding: 8px 0;
  margin: 0;
`;

const Hr = styled.hr`
  margin: 0;
  border-top: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  border-bottom: 0;
  width: 100%;
`;

export default Separator;
