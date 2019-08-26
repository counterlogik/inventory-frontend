import React from "react";
import { Router, Link } from "@reach/router";
import styled from "styled-components";
import ItemsList from "./components/ItemsList";
import Item from "./components/Item";

const Container = styled.div`
  height: 100px;
`;

const Header = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  padding: 10px;

  h3 {
    margin: 0 0 10px 0;
  }

  ul {
    display: flex;
    padding: 0;
    list-style: none;

    li:not(:last-child) {
      margin-right: 20px;
    }
  }
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
            <Link to="/item/add">add item</Link>
          </li>
        </ul>
      </Header>
      <Router>
        <ItemsList path="/" />
        <Item path="/item/add" />
        <Item path="/item/:itemId" />
      </Router>
    </Container>
  );
}

export default App;
