import React from 'react';
import styled from 'styled-components';
import AddItem from "./components/AddItem";

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;


function App() {
  return (
    <Container>
      <Header>
        <h3>
          inventory
        </h3>
      </Header>
      <AddItem />
    </Container>
  );
}

export default App;
