import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router"
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

function Item({ itemId, uri }) {
  const [hasError, setErrors] = useState(false);
  const [underEdit, setUnderEdit] = useState(false);
  const [isNew, setIsNew] = useState(itemId ? false : true);
  const [item, setItem] = useState({
    description: "",
    model: "",
    categories: [],
    locations: [],
    spark: 2,
    count: 1,
    monetaryValue: 0,
    link: "",
    notes: [],
    tags: []
  });

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

    console.log("effect called");

    if(itemId) {
      getItem();
    } else {
      // reset everything if we came from an existing item
      if(!itemId) {
        setIsNew(true);
        setItem({
          description: "",
          model: "",
          categories: [],
          locations: [],
          spark: 2,
          count: 1,
          monetaryValue: 0,
          link: "",
          notes: [],
          tags: []
        });
      }

      // set edit mode to true regardless
      setUnderEdit(true);
    }

  }, [itemId, uri]);

  function Detail(props) {
    const { underEdit } = props;

    return (
      <ItemDetail>
        {
          !underEdit
            ? props.detailValue
            : props.editable
              ? <span>SPECIAL FIELD</span>
              : <Field
                  name={props.detailName}
                  render={({ field }) => (
                    <input {...field} value={field.value || ""} type="text" />
                  )}
                />
        }
      </ItemDetail>
    );
  }

  function ToggleableForm(props) {
    const { ...item } = props.item;

    return (underEdit
      ? <Formik
          initialValues={item}
          onSubmit={doSubmit}
          render={() => (
            <Form>
              {props.children}
              <EditSaveToggle type="submit">SAVE</EditSaveToggle>
            </Form>
          )} />
      : <>
        {props.children}
      </>);
  }

  function Details(props) {
    const { underEdit, ...item } = props;

    return (
      <ToggleableForm underEdit={underEdit} item={item}>
        <Detail underEdit={underEdit} detailName="description" detailValue={!isNew && item.description} />

        <Detail underEdit={underEdit} detailName="model" detailValue={!isNew && item.model} />

        <Detail underEdit={underEdit}
          detailName="categories" detailValue={!isNew && item.categories && item.categories.length && [...item.categories.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          editable={true}
        />

        <Detail underEdit={underEdit}
          detailName="locations" detailValue={!isNew && item.locations && item.locations.length && [...item.locations.map(({ _id, name }) => <span key={_id}>{name}</span>)]}
          editable={true}
        />

        <Detail underEdit={underEdit} detailName="spark" detailType="select" detailValue={!isNew && item.spark} />

        <Detail underEdit={underEdit} detailName="count" detailType="number" detailValue={!isNew && item.count} />

        <Detail underEdit={underEdit} detailName="monetaryValue" detailType="number" detailValue={!isNew && item.monetaryValue} />

        <Detail underEdit={underEdit} detailName="link" detailType="url" detailValue={!isNew && item.link} />

        <Detail underEdit={underEdit} detailName="notes" detailType="textarea" detailValue={!isNew && item.notes} />

        <Detail underEdit={underEdit}
          detailName="tags" detailValue={!isNew && item.tags && item.tags.length && item.tags.map(tag => (<span>{tag}</span>))}
          editable={true}
        />
      </ToggleableForm>
    );
  }

  function doSubmit(values) {
    if(isNew) {
      axios({
        method: "POST",
        url: `http://localhost:7777/api/item/create`,
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(values)
      })
        .then(res => {
          console.log("SET UNDER EDIT TO FALSE");
          setItem({ ...res.data });
          setIsNew(false)
          setUnderEdit(false);
          navigate(`/item/${res.data._id}`);
        })
        .catch(err => console.log(err));



    } else {
      console.log("make the update call");

      // coming soon
      axios({
        method: "POST",
        url: `http://localhost:7777/api/item/update`,
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(values)
      })
        .then(res => navigate(`/item/${res.data._id}`))
        .catch(err => console.log(err));

      setUnderEdit(false);
    }


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
          {
            !underEdit && <EditSaveToggle onClick={() => setUnderEdit(true)}>EDIT</EditSaveToggle>
          }
        </ItemDetails>
      )}
    </Container>
  );
}

export default Item;
