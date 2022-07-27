import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../../styles/SignUpPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import logo from "../../logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("signin");
    } catch (error) {
      setErrors(error.response?.data);
    }
  };

  return (
    <div>
      <Container fluid className="p-3">
        <Row className="justify-content-center">
          <Col md={10} className={`p-3 my-3 bg-light rounded-4 ${styles.Form}`}>
            <Container className="m-1 py-2 px-5">
              <h1>
                <img height={50} width={50} src={logo} alt="logo"></img> Welcome
                to SportsTalk
              </h1>
              <p>
                If you do not yet have an account with us, please sign upp for
                one below.
                <br />
                <span>
                  Do you already have an account? Log in{" "}
                  <Link to="/signin">here</Link>
                </span>
              </p>
            </Container>
            <Container className="m-1 pt-5 pb-1 px-5">
              <h2 className="text-center">Sign up</h2>
            </Container>
            <Form className="px-3 pb-2 px-5" onSubmit={handleSubmit}>
              <Form.Group
                className={`${styles.Form} my-2`}
                controlId="username"
              >
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.FormControl}
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group
                className={`${styles.Form} my-2`}
                controlId="password1"
              >
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.FormControl}
                  type="password"
                  name="password1"
                  placeholder="Enter password"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Form.Group
                className={`${styles.Form} my-2`}
                controlId="password2"
              >
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  className={styles.FormControl}
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <Button className={`${styles.Btn28} mt-3`} type="submit">
                Sign up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" key={idx} className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;
