import React, { useState } from "react";
import { navigate } from "@reach/router"
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import qs from "qs";

const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: 1px dashed darkblue;
  margin: 20px auto;
  padding: 20px;
`;

const FormHeader = styled.h4`
  font-size: 24px;
  font-weight: 700;
`;

const ItemField = styled.input`
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
`;

const ItemSelectField = styled.select`
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
`;

const ItemTextareaField = styled.textarea`
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
  border-radius: 0;


  padding: 10px;

  &:focus {
    outline: 0;
  }
`;

function AddItem() {
  return (
    <Wrapper>
      <FormHeader>add item</FormHeader>
      <Formik
        initialValues={{
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
        }}
        onSubmit={values => {
          axios({
            method: "POST",
            url: `http://localhost:7777/api/item/create`,
            responseType: "json",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify(values)
          })
            .then(res => navigate(`/item/${res.data._id}`))
            .catch(err => console.log(err));

        }}
        render={() => (
          <Form>
            <Field
              name="description"
              render={({ field }) => (
                <ItemField
                  {...field}
                  type="text"
                  placeholder="new item description"
                />
              )}
            />
            <ErrorMessage name="description" component="div" />
            <Field
              name="model"
              render={({ field }) => (
                <ItemField {...field} type="text" placeholder="model" />
              )}
            />
            <ErrorMessage name="model" component="div" />
            <Field
              name="categories"
              render={({ field }) => (
                <ItemField {...field} type="text" placeholder="categories" />
              )}
            />
            <ErrorMessage name="categories" component="div" />
            <Field
              name="locations"
              render={({ field }) => (
                <ItemField {...field} type="text" placeholder="locations" />
              )}
            />
            <ErrorMessage name="locations" component="div" />
            <Field
              name="spark"
              render={({ field }) => (
                <ItemSelectField {...field}>
                  <option value="0">lose</option>
                  <option value="1">like</option>
                  <option value="2">love</option>
                  <option value="3">need</option>
                </ItemSelectField>
              )}
            />
            <ErrorMessage name="spark" component="div" />
            <Field
              name="count"
              render={({ field }) => (
                <ItemField {...field} type="number" placeholder="count" />
              )}
            />
            <ErrorMessage name="count" component="div" />
            <Field
              name="monetaryValue"
              render={({ field }) => (
                <ItemField {...field} type="number" placeholder="0" />
              )}
            />
            <ErrorMessage name="monetaryValue" component="div" />
            <Field
              name="link"
              render={({ field }) => (
                <ItemField {...field} type="url" placeholder="link" />
              )}
            />
            <ErrorMessage name="link" component="div" />
            <Field
              name="notes"
              render={({ field }) => (
                <ItemTextareaField
                  {...field}
                  rows="4"
                  cols="20"
                  maxlength="1024"
                />
              )}
            />
            <ErrorMessage name="notes" component="div" />
            <Field
              name="tags"
              render={({ field }) => (
                <ItemField {...field} type="text" placeholder="tags" />
              )}
            />
            <ErrorMessage name="tags" component="div" />
            <Field
              name="image"
              render={({ field }) => <ItemField {...field} type="file" />}
            />
            <ErrorMessage name="image" component="div" />
            <SubmitButton type="submit">add item!</SubmitButton>
          </Form>
        )}
      />
    </Wrapper>
  );
}

export default AddItem;
