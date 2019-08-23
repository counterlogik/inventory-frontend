import React from 'react';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const Wrapper = styled.div`
  width: 375px;
  height: 812px;
  border: 1px dashed hsla(0, 0%, 98%, 0.65);
`;

const FormHeader = styled.h4`
  font-size: 24px;
  font-weight: 700;
`;

function AddItem() {
  return (
    <Wrapper>
      <FormHeader>add item</FormHeader>
      <Formik
        initialValues={{
          description: '',
          categories: '',
          model: '',
          link: '',
          count: 1,
          spark: 2,
          locations: '',
          notes: '',
          itemValue: 0,
          tags: '',
          photo: ''
        }}
        onSubmit={() => {
          // call REST API here
        }}
        render={() => (
          <Form>
            <Field name="description" placeholder="new item description" />
            <ErrorMessage name="description" component="div" />
            <Field name="categories" placeholder="categories" />
            <ErrorMessage name="categories" component="div" />
            <Field name="model" placeholder="model" />
            <ErrorMessage name="model" component="div" />
            <Field type="url" name="link" placeholder="link" />
            <ErrorMessage name="link" component="div" />
            <Field type="number" name="count" placeholder="count" />
            <ErrorMessage name="count" component="div" />
            <Field component="select" name="spark" >
              <option value="0">lose</option>
              <option value="1">like</option>
              <option value="2">love</option>
              <option value="3">need</option>
            </Field>
            <ErrorMessage name="spark" component="div" />
            <Field name="locations" placeholder="locations" />
            <ErrorMessage name="locations" component="div" />
            <Field type="textarea" name="notes" placeholder="notes" />
            <ErrorMessage name="notes" component="div" />
            <Field name="itemValue" placeholder="itemValue" />
            <ErrorMessage name="itemValue" component="div" />
            <Field name="tags" placeholder="tags" />
            <ErrorMessage name="tags" component="div" />
            <Field type="file" name="photo" placeholder="photo" />
            <ErrorMessage name="photo" component="div" />
            <button type="submit">
              add item!
            </button>
          </Form>
        )}
      />
    </Wrapper>
  );
}

export default AddItem;
