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

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    background-color: #616161;
    color: #ffffff;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 16px;
    outline: 0;
    padding: 0;
    margin-right: 10px;
  }
`;

function Item({ itemId }) {
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

    // if we are on an item route with a specific id, grab it
    if(itemId) {
      getItem();
    } else {
      // reset everything, form etc, if we came from an existing item route
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

  }, [itemId]);

  function InputChip({ underEdit, _id, name }) {
    return <div key={_id} disabled={underEdit}>{name}</div>;
  }

  function InputChips({ ...props }) {
    return (
      <>
        {props.detailValue && <Chips>{[...props.detailValue.map(member => <InputChip underEdit={props.underEdit} {...member} />)]}</Chips>}
        <Field
          name={props.detailName}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
      </>
    );
  }

  function Detail({ underEdit, Custom, ...others }) {
    return (
      <ItemDetail>
        {
          Custom
            ? <Custom underEdit={underEdit} {...others} />
            : <Field
                name={others.detailName}
                render={({ field, form: { isSubmitting } }) => (
                  <input {...field} value={field.value || ""} type="text" disabled={!underEdit || isSubmitting} />
                )}
              />
        }
      </ItemDetail>
    );
  }

  function ToggleableForm(props) {
    const { ...item } = props.item;

    return (
      <Formik
        initialValues={item}
        onSubmit={doSubmit}
        render={() => (
          <Form>
            {props.children}
            <EditSaveToggle type="submit">{props.underEdit ? 'SAVE' : 'EDIT'}</EditSaveToggle>
          </Form>
        )} />
      );
  }

  function Details(props) {
    const { underEdit, ...item } = props;

    console.log();

    return (
      <ToggleableForm underEdit={underEdit} item={item}>
        <Detail underEdit={underEdit} detailName="description" detailValue={!isNew && item.description} />

        <Detail underEdit={underEdit} detailName="model" detailValue={!isNew && item.model} />

        <Detail
          underEdit={underEdit}
          detailName="categories"
          detailValue={!isNew && item.categories && item.categories.length && item.categories}
          Custom={InputChips}
        />

        <Detail
          underEdit={underEdit}
          detailName="locations"
          detailValue={!isNew && item.locations && item.locations.length && item.locations}
          Custom={InputChips}
        />

        <Detail underEdit={underEdit} detailName="spark" detailType="select" detailValue={!isNew && item.spark} />

        <Detail underEdit={underEdit} detailName="count" detailType="number" detailValue={!isNew && item.count} />

        <Detail underEdit={underEdit} detailName="monetaryValue" detailType="number" detailValue={!isNew && item.monetaryValue} />

        <Detail underEdit={underEdit} detailName="link" detailType="url" detailValue={!isNew && item.link} />

        <Detail underEdit={underEdit} detailName="notes" detailType="textarea" detailValue={!isNew && item.notes} />

        {/* <Detail
          underEdit={underEdit}
          detailName="tags"
          detailValue={!isNew && item.tags && item.tags.length && item.tags}
          Custom={InputChips}
        /> */}
      </ToggleableForm>
    );
  }

  function doSubmit(values) {
    if(isNew) {
      // create a new Item from the user input data and then navigate to its view route
      axios({
        method: "POST",
        url: `http://localhost:7777/api/item/create`,
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(values)
      })
        .then(res => {
          setItem({ ...res.data });
          setIsNew(false)
          setUnderEdit(false);
          navigate(`/item/${res.data._id}`);
        })
        .catch(err => console.log(err));
    } else if(underEdit) {
      // update this Item from the updated user input data and reflect changes locally
      axios({
        method: "POST",
        url: `http://localhost:7777/api/item/${itemId}/update`,
        responseType: "json",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(values)
      })
        .then(res => {
          setItem({ ...values });
        })
        .catch(err => console.log(err));

      setUnderEdit(false);
    } else {
      // if existing item then toggle should activate edit mode
      setUnderEdit(true);
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
        </ItemDetails>
      )}
    </Container>
  );
}

export default Item;
