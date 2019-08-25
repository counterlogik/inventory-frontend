import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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

  li {
    font-size: 10px;
  }
`;

const ItemDetail = styled.li`
  margin-bottom: 10px;
  padding: 10px;

  h6 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  span {
    font-size: 10px;
  }

  span + span {
    position: relative;
    margin-left: 20px;

    &::before {
      content: " | ";
      position: absolute;
      top: 0;
      left: -12px;
    }
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

  function Details({
    description,
    model,
    categories,
    locations,
    spark,
    count,
    monetaryValue,
    link,
    notes,
    tags
  }) {
    return (
      <ItemDetails>
        <ItemDetail>
          <h6>{description}</h6>
        </ItemDetail>

        <ItemDetail>{model}</ItemDetail>

        <ItemDetail>
          {[...categories.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
        </ItemDetail>

        <ItemDetail>
          {[...locations.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
        </ItemDetail>

        <ItemDetail>{spark}</ItemDetail>

        <ItemDetail>{count}</ItemDetail>

        <ItemDetail>{monetaryValue}</ItemDetail>

        <ItemDetail>{link}</ItemDetail>

        <ItemDetail>{notes}</ItemDetail>

        <ItemDetail>
          {tags.map(tag => (
            <span>{tag}</span>
          ))}
        </ItemDetail>
      </ItemDetails>
    );
  }

  return (
    <Container>
      {hasError ? (
        <p>
          There was an error trying to get the item (id: {itemId}). Please try
          again later.
        </p>
      ) : Object.keys(item).length ? (
        <Details {...item} />
      ) : (
            <ItemDetail>
              <p>There are no details for this item.</p>
            </ItemDetail>
          )}
    </Container>
  );
}

export default Item;
