import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../../styles/SignInPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import logo from "../../logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInPage = () => {
    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = signInData;

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        })
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/login/', signInData)
            navigate('/')
        } catch (error) {
            setErrors(error.response?.data)
            console.log(error)
        }
    }

    const [errors, setErrors] = useState({})

    return (
        <div>
            <Container fluid className="p-3">
                <Row className="justify-content-center">
                    <Col md={10} className={`p-3 my-3 bg-light rounded-4 ${styles.Form}`}>
                        <Container className="m-1 py-2 px-5 text-center">
                            <h1>
                                <img height={50} width={50} src={logo} alt="logo"></img> Welcome
                                to SportsTalk
                            </h1>
                            <p>
                                If you already have an account with us, please sign in below.
                                <br />
                                <span>
                                    Do you not have an account yet? Sign up{" "}
                                    <Link to="/signup">here</Link>
                                </span>
                            </p>
                        </Container>
                        <Container className="m-1 pt-5 pb-1 px-5">
                            <h2 className="text-center">Sign in</h2>
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
                                controlId="password"
                            >
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    className={styles.FormControl}
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors.password?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Button className={`${styles.Btn28} mt-3`} type="submit">
                                Sign in
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
    )
}

export default SignInPage