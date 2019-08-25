import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import qs from "qs";

const Container = styled.div`
  width: 375px;
  margin: 10px auto;
  padding: 20px;
  border: 1px dashed #80BEAF;
`;

const ItemDetails = styled.ul`
  list-style: none;
  margin: 10px auto;
  padding: 20px;

  li {
    font-size: 10px;
  }
`;

const ToggleButton = styled.button`
  border: 0;
  background-color: #80BEAF;
  color: #F9F9F9;
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

  function Detail(props) {
    const { underEdit } = props;

    return (
      <ItemDetail>
        {
          !underEdit
            ? props.default
            : props.dynamic
        }
      </ItemDetail>
    );
  }

  function doSubmitOnToggle(values) {
    console.log(values);
    doHandleToggleClick();
  }

  function ToggleableForm(props) {
    const { ...item } = props.item;

    return (underEdit
      ? <Formik
          initalValues={{
            description: item.description,
            model: "",
            categories: [],
            locations: [],
            spark: 2,
            count: 1,
            monetaryValue: 0,
            link: "",
            notes: [],
            tags: []
          }}
          onSubmit={doSubmitOnToggle}
          render={() => (
            <Form>
              {props.children}
            </Form>
          )} />
      : <>
        {props.children}
      </>);
  }

  function Details(props) {
    console.log(props);
    const { underEdit, ...item } = props;

    return (
      <ToggleableForm underEdit={underEdit} item={item}>
        <Detail underEdit={underEdit} default={<h6>{item.description}</h6>} dynamic={item.description} />

        <Detail underEdit={underEdit} default={item.model} dynamic={item.model} />

        <Detail underEdit={underEdit}
          default={[...item.categories.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          dynamic="INPUT CHIPS (CATEGORIES)"
        />

        <Detail underEdit={underEdit}
          default={[...item.locations.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          dynamic="INPUT CHIPS (LOCATIONS)"
        />

        <Detail underEdit={underEdit} default={item.spark} dynamic={item.spark} />

        <Detail underEdit={underEdit} default={item.count} dynamic={item.count} />

        <Detail underEdit={underEdit} default={item.monetaryValue} dynamic={item.monetaryValue} />

        <Detail underEdit={underEdit} default={item.link} dynamic={item.link} />

        <Detail underEdit={underEdit} default={item.notes} dynamic={item.notes} />

        <Detail underEdit={underEdit}
          default={item.tags.map(tag => (<span>{tag}</span>))}
          dynamic="INPUT CHIPS (TAGS)"
        />

      </ToggleableForm>
    );
  }

  function doHandleToggleClick() {
    if(underEdit) {
      // http
      console.log("make the call");
    }

    setUnderEdit(!underEdit);
  }

  return (
    <Container>
      {hasError ? (
        <p>
          There was an error trying to get the item (id: {itemId}). Please try
          again later.
        </p>
      ) : Object.keys(item).length ? (
        <ItemDetails>
          {
            underEdit
              ? <Details underEdit={underEdit} {...item} />
              : <Details {...item} />
          }
        </ItemDetails>
      ) : (
        <ItemDetail>
          <p>There are no details for this item.</p>
        </ItemDetail>
      )}
      <ToggleButton onClick={doHandleToggleClick} className={underEdit ? "editing" : ""}>
        {underEdit ? "DONE" : "EDIT"}
      </ToggleButton>
    </Container>
  );
}

export default Item;
