import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const Container = styled.div`
  width: 375px;
  margin: 10px auto;
  padding: 20px;
  border: 1px dashed darkblue;
`;

const ItemDetails = styled.ul`
  list-style: none;
  margin: 10px auto;
  padding: 20px;
  border: 1px dashed darkblue;
`;

const ItemDetail = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px dashed darkblue;

  h6 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  p {
    font-size: 10px;
  }
`;

function Item({ itemId }) {
  const [hasError, setErrors] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    function getItem() {
      axios({
        method: "get",
        url: `http://localhost:7777/api/item/${itemId}`,
        responseType: "json"
      })
        .then(res => setItem({ ...res.data }))
        .catch(err => setErrors(err));
    }

    getItem();
  }, [itemId]);

  function Item({ description, value }) {
    return (
      <ItemDetail>
        <h6>{description}</h6>
        <p>{value}</p>
      </ItemDetail>
    );
  }

  return (
    <Container>
      {
        hasError
          ? <p>There was an error trying to get the item (id: { itemId }). Please try again later.</p>
          : <ItemDetails>
            {
              Object.keys(item).length
                ? Object.entries(item).map(([key, value]) => <Item key={key} description={key} value={typeof value === "string" ? value : value._id} />)
                : <ItemDetail><p>There are no details for this item.</p></ItemDetail>
            }
          </ItemDetails>
      }
    </Container>
  );
}

export default Item;
