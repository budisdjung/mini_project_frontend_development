import React, { useState, } from "react";
import {
  Button,
  FormFeedback,
  Input,
  Label,
  Row,
  Col,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import request from "../../request";
import FormRegister from "./form";

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email required'),
  password: yup.string().min(8).required('Password required'),
});

export default function LoginPages() {
  const isAuth = sessionStorage.getItem("access_token");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => handleSubmitLogin(),
    validationSchema: validationSchema,
  });

  const handleSubmitLogin = async () => {
    await request
      .post("http://localhost:7777/login", formik.values)
      .then(({ token }) => sessionStorage.setItem("access_token", token))
      .catch((err) => alert(err));
  };

  const [formType, setFormType] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formRegister, setFormRegister] = useState(null);

  const handleRegisterForm = () => {
    setFormType("Register");
    setFormVisible(true);
    setFormRegister();
  };

  return (
    <div className="login-pages">
      {isAuth && <Navigate to="/dashboard" />}
      <Row>
        <Col md={6}>
          <img src="https://picsum.photos/740/645" alt="login-img" />
        </Col>
        <Col md={6} style={{ padding: "30px 80px" }}>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                invalid={Boolean(formik.errors.email) && formik.touched.email}
              />
              {Boolean(formik.errors.email) && formik.touched.email && (
                <FormFeedback>{formik.errors.email}</FormFeedback>
              )}
            </FormGroup>
            <br />
            <FormGroup>
              <Label>Password</Label>
              <Input
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                invalid={
                  Boolean(formik.errors.password) && formik.touched.password
                }
              />
              {Boolean(formik.errors.password) && formik.touched.password && (
                <FormFeedback>{formik.errors.password}</FormFeedback>
              )}
            </FormGroup>
            <Row>
              <Col>
                <Button outline color="success" type="submit">Login</Button>
              </Col>
              <Col>
                <Button outline color="info" onClick={() => handleRegisterForm()}>Register</Button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
      {/*Modal Form*/}
      <Modal isOpen={formVisible} toggle={() => setFormVisible(!formVisible)}>
        <ModalHeader>{`Form ${formType} Admin`}</ModalHeader>
        <ModalBody>
            <FormRegister
            type={formType}
            formRegister={formRegister}
            closeModal={() => setFormVisible(false)}
            />
        </ModalBody>
      </Modal>
    </div>
  );
}
