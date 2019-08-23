import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: 1px dashed hsla(0, 0%, 98%, 0.65);
`;

const FormHeader = styled.h4`
  font-size: 24px;
  font-weight: 700;
`;

function AddItem() {
  return (
    <Wrapper>
      <FormHeader>add item</FormHeader>
      <form>
        <input type="text" />
        <button type="submit">submit item!</button>
      </form>
    </Wrapper>
  );
}

export default AddItem;
