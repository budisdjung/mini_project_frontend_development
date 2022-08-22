import React from "react";
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

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().min(8).required("Password required"),
  name: yup.string().required("Name required"),
  address: yup.string().required("Address required"),
  join_date: yup.date().default(() => new Date()).required("Join Date required"),
  phone_number: yup.string().required("Phone Number required"),
});

export default function FormRegister({ type, formRegister, closeModal }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      address: "",
      join_date: "",
      phone_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegisterForm(),
  });

  const handleRegisterForm = () => {};

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <>
          <FormGroup>
            <Label>Email</Label>
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              invalid={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && Boolean(formik.errors.email) && (
              <FormFeedback>{formik.errors.email}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              invalid={formik.touched.password && Boolean(formik.errors.password)}
            />
            {formik.touched.password && Boolean(formik.errors.password) && (
              <FormFeedback>{formik.errors.password}</FormFeedback>
            )}
          </FormGroup>
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
            <Label>Address</Label>
            <Input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              invalid={formik.touched.address && Boolean(formik.errors.address)}
            />
            {formik.touched.address && Boolean(formik.errors.address) && (
              <FormFeedback>{formik.errors.address}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Join Date</Label>
            <Input
              name="join_date"
              type="date"
              value={formik.values.join_date}
              onChange={formik.handleChange}
              invalid={formik.touched.join_date && Boolean(formik.errors.join_date)}
            />
            {formik.touched.join_date && Boolean(formik.errors.join_date) && (
              <FormFeedback>{formik.errors.join_date}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              name="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              invalid={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
            />
            {formik.touched.phone_number && Boolean(formik.errors.phone_number) && (
              <FormFeedback>{formik.errors.phone_number}</FormFeedback>
            )}
          </FormGroup>
          <Row>
            <Col>
                <Button outline color="success" type="submit">
                    Register
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
