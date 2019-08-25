import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import qs from "qs";

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
  const [underEdit, setUnderEdit] = useState(false);
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

  function StaticDetails(props) {
    return (
      <>
        <ItemDetail>
          <h6>{props.description}</h6>
        </ItemDetail>

        <ItemDetail>{props.model}</ItemDetail>

        <ItemDetail>
          {[...props.categories.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
        </ItemDetail>

        <ItemDetail>
          {[...props.locations.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
        </ItemDetail>

        <ItemDetail>{props.spark}</ItemDetail>

        <ItemDetail>{props.count}</ItemDetail>

        <ItemDetail>{props.monetaryValue}</ItemDetail>

        <ItemDetail>{props.link}</ItemDetail>

        <ItemDetail>{props.notes}</ItemDetail>

        <ItemDetail>
          {props.tags.map(tag => (
            <span>{tag}</span>
          ))}
        </ItemDetail>
      </>
    );
  }

  function Details(props) {
    console.log(props);
    const { underEdit, ...others } = props;

    return (
      <ItemDetails>
        {
          underEdit
            ? <Formik>
              TEST
            </Formik>
            : <StaticDetails {...others} />
        }
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
        <Details underEdit={underEdit} {...item} />
      ) : (
        <ItemDetail>
          <p>There are no details for this item.</p>
        </ItemDetail>
      )}
    </Container>
  );
}

export default Item;
