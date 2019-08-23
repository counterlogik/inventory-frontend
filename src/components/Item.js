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
`;

const ItemDetail = styled.li`
  margin-bottom: 10px;
  padding: 10px;

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

  function Details({ id, desc, spark, categories, locations, tags, model, link, notes }) {
    return (
      <ItemDetails>
        <ItemDetail>
          <h6>{desc}</h6>
        </ItemDetail>

        <ItemDetail>
          <p>{spark}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{categories}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{locations}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{tags}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{model}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{link}</p>
        </ItemDetail>

        <ItemDetail>
          <p>{notes}</p>
        </ItemDetail>
      </ItemDetails>
    );
  }

  return (
    <Container>
      {
        hasError
          ? <p>There was an error trying to get the item (id: { itemId }). Please try again later.</p>
          : Object.keys(item).length
            ? <Details
                id={ itemId }
                desc={item.description}
                spark={item.spark}
                categories={item.categories}
                locations={item.locations}
                tags={item.tags}
                model={item.model}
                link={item.link}
                notes={item.notes}
              />
            : <ItemDetail><p>There are no details for this item.</p></ItemDetail>
      }
    </Container>
  );
}

export default Item;
