import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../styles/NavBar.module.css'
import logo from '../logo.png'
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/UserContext'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post('dj-rest-auth/logout/')
            setCurrentUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    const loggedInNavBar = (
        <>
            <NavLink className={styles.Link} to='/'>Feed</NavLink>
            <NavLink className={styles.Link} to='/createpost'>Add Post</NavLink>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-autoclose-true" className={`${styles.Link} custom-dd`}>
                    <img height={40} width={40} alt='profile pic' src={currentUser?.profile_image} />{currentUser?.username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to={`/profiles/${currentUser?.profile_id}`}>View Profile</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='' >Edit Profile</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='' onClick={handleSignOut}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

    const loggedOutNavBar = (
        <>
            <NavLink className={styles.Link} to='/'>Feed</NavLink>
            <NavLink className={styles.Link} to='/signup'>Sign up</NavLink>
            <NavLink className={styles.Link} to='/signin'>Sign in</NavLink>
        </>
    )

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
                        style={{ maxHeight: '100px', paddingRight: '5rem' }}>
                        {currentUser ? loggedInNavBar : loggedOutNavBar}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default NavBar