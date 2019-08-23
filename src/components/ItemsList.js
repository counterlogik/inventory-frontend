import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const ListItems = styled.ul`
  list-style: none;
  width: 375px;
  margin: 20px auto;
  padding: 40px;
  border: 1px dashed darkblue;
`;

function ItemsList() {
  const [hasError, setErrors] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    function getItems() {
      axios({
        method: "get",
        url: "http://localhost:7777/api/items",
        responseType: "json"
      })
        .then(res => setItems(res.data))
        .catch(err => setErrors(err));
    }

    getItems();
  }, []);

  function ListItem(props) {
    return <li>{props.value}</li>;
  }

  return (
    hasError
      ? <p>There was an error trying to get your items. Please try again later.</p>
      : <ListItems>
        {
          items.length
            ? items.map((item) => <ListItem key={item._id} value={item.description} />)
            : <li>You don't have any items yet. Please add some.</li>
        }
      </ListItems>
  );
}

export default ItemsList;
