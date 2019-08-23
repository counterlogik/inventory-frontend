import React from "react";
import { Router, Link } from "@reach/router";
import styled from "styled-components";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemsList";

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
        <h3>inventory</h3>
        <ul>
          <li>
            <Link to="/">items list</Link>
          </li>
          <li>
            <Link to="/add-item">add item</Link>
          </li>
        </ul>
      </Header>
      <Router>
        <ItemsList path="/" />
        <AddItem path="/add-item" />
      </Router>
    </Container>
  );
}

export default App;
