import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../styles/NavBar.module.css'
import logo from '../logo.png'
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed='top'>
            <Container fluid>
                <Navbar.Brand to='/' className={styles.Brand}>
                    <img
                        alt="logo"
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block my-1 mx-1"
                    />
                    SportsTalk
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex ms-auto px-4">
                        <Form.Control
                            type="search"
                            placeholder="Search posts or users"
                            className={`me-2 ${styles.Form}`}
                            aria-label="Search"
                        />
                        <Button className={styles.bn3}>Search</Button>
                    </Form>
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}>
                    {/* // {userIsLoggedIn ? (<>
                    //     <NavLink className={styles.Link} to='/'>Home</NavLink>
                    //     <NavLink className={styles.Link} to='/createpost'>Add Post</NavLink>
                    //     <NavLink className={styles.Link} to='/signout'>Sign Out</NavLink>
                    //     <NavLink className={styles.Link} to='/profile'>Profile</NavLink>
                            {/* 
                    // </>) : (<> */}
                            <NavLink className={styles.Link} to='/'>Home</NavLink>
                            <NavLink className={styles.Link} to='/signup'>Sign up</NavLink>
                            <NavLink className={styles.Link} to='/signin'>Sign in</NavLink>
                            {/* </>)} */}
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar