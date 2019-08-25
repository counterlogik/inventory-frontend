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

const EditSaveToggle = styled.button`
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
  const [isNew, setIsNew] = useState(itemId ? false : true);
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

    if(itemId) {
      getItem();
    } else {
      setUnderEdit(true);
    }

  }, [itemId]);

  function Detail(props) {
    const { underEdit } = props;

    console.log(props);

    return (
      <ItemDetail>
        {
          !underEdit
            ? props.readable !== 0 && props.readable
            : props.editable
        }
      </ItemDetail>
    );
  }

  function doSubmitOnToggle(values) {
    doHandleToggle();
  }

  function ToggleableForm(props) {
    const { ...item } = props.item;

    let initialValues = {
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
    };

    if(!isNew) {
      initialValues = {
        description: item.description,
        model: item.model,
        categories: item.categories,
        locations: item.locations,
        spark: item.spark,
        count: item.count,
        monetaryValue: item.monetaryValue,
        link: item.link,
        notes: item.notes,
        tags: item.tags
      };
    }

    return (underEdit
      ? <Formik
          initalValues={initialValues}
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
    const { underEdit, ...item } = props;
    let itemChecked;
    if(!isNew) {
      itemChecked = item;
    }

    console.log("BEFORE: ", itemChecked);

    return (
      <ToggleableForm underEdit={underEdit} item={itemChecked}>
        <Detail underEdit={underEdit} readable={itemChecked && <h6>{itemChecked.description}</h6>} editable={itemChecked && <h6>{itemChecked.description}</h6>} />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.model} editable={itemChecked && itemChecked.model} />

        <Detail underEdit={underEdit}
          readable={itemChecked && itemChecked.categories && itemChecked.categories.length && [...itemChecked.categories.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          editable="INPUT CHIPS (CATEGORIES)"
        />

        <Detail underEdit={underEdit}
          readable={itemChecked && itemChecked.locations && itemChecked.locations.length && [...itemChecked.locations.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          editable="INPUT CHIPS (LOCATIONS)"
        />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.spark} editable={itemChecked && itemChecked.spark} />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.count} editable={itemChecked && itemChecked.count} />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.monetaryValue} editable={itemChecked && itemChecked.monetaryValue} />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.link} editable={itemChecked && itemChecked.link} />

        <Detail underEdit={underEdit} readable={itemChecked && itemChecked.notes} editable={itemChecked && itemChecked.notes} />

        <Detail underEdit={underEdit}
          readable={itemChecked && itemChecked.tags && itemChecked.tags.length && itemChecked.tags.map(tag => (<span>{tag}</span>))}
          editable="INPUT CHIPS (TAGS)"
        />

      </ToggleableForm>
    );
  }

  function doHandleToggle() {
    if(isNew) {
      console.log("make the create call");
    } else if(underEdit) {
      console.log("make the update call");
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
      ) : (
        <ItemDetails>
          <Details underEdit={underEdit} {...item} />
          <EditSaveToggle onClick={doHandleToggle}>
            {underEdit ? "SAVE" : "EDIT"}
          </EditSaveToggle>
        </ItemDetails>
      )}
    </Container>
  );
}

export default Item;
