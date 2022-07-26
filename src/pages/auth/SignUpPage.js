import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../../styles/SignUpPage.module.css'

const SignUpPage = () => {
    return (
        <div>
            <Form>
                <Form.Group className={styles.Form} controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className={styles.FormControl} type="email" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className={styles.Form} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className={styles.FormControl} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className={styles.Form} controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className={styles.FormControl} type="password" placeholder="Confirm password" />
                </Form.Group>
                <Button className={styles.Button} type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUpPage