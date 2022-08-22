import React, { useEffect, useCallback, } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import request from "../../request";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  quantity: yup.number().required("Quantity required"),
  price: yup.number().required("Price required"),
  naration: yup.string().required("Naration about product required"),
  image: yup.string().required("Image link required")
});

export default function FormDashboard({ type, formUpdatedId, closeModal }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
      naration: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleSubmitForm(),
  });

  const handleSubmitForm = async (e) => {

    if (type === 'Create') {
      request.post('/product', formik.values)
        .then(() => refetch())
        .catch((err) => alert(err))
    }

    if (type === 'Update') {
      request.post('/product', formik.values)
        .then(() => refetch())
        .catch((err) => alert(err))
    }

    closeModal()
  };

  const handleSetUpdatedForm = useCallback(async () => {
    request.get(`/product/${formUpdatedId}`)
        .then(({ data }) => {
            formik.setFieldValue('name', data.name);
            formik.setFieldValue('quantity', data.quantity);
            formik.setFieldValue('price', data.price);
            formik.setFieldValue('naration', data.naration);
            formik.setFieldValue('image', data.image)
        })
        .catch((err) => alert(err))
  }, [formUpdatedId, formik])

  useEffect(() => {
    if ( type === 'update') {
        handleSetUpdatedForm()
    }
  }, [formUpdatedId, type, handleSetUpdatedForm])

  console.log({ formik });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <FormGroup>
            <Label>Name</Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              invalid={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && Boolean(formik.errors.name) && (
              <FormFeedback>{formik.errors.name}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Quantity</Label>
            <Input
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              invalid={
                formik.touched.quantity && Boolean(formik.errors.quantity)
              }
            />
            {formik.touched.quantity && Boolean(formik.errors.quantity) && (
              <FormFeedback>{formik.errors.quantity}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              invalid={formik.touched.price && Boolean(formik.errors.price)}
            />
            {formik.touched.price && Boolean(formik.errors.price) && (
              <FormFeedback>{formik.errors.price}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Naration</Label>
            <Input
              name="naration"
              value={formik.values.naration}
              onChange={formik.handleChange}
              invalid={formik.touched.naration && Boolean(formik.errors.naration)}
            />
            {formik.touched.naration && Boolean(formik.errors.naration) && (
              <FormFeedback>{formik.errors.naration}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Image Link</Label>
            <Input
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              invalid={formik.touched.image && Boolean(formik.errors.image)}
            />
            {formik.touched.image && Boolean(formik.errors.image) && (
              <FormFeedback>{formik.errors.image}</FormFeedback>
            )}
          </FormGroup>
          <Row>
            <Col>
              <Button outline color="success" type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button outline color="primary" onClick={() => closeModal()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </>
      </form>
    </>
  );
}
