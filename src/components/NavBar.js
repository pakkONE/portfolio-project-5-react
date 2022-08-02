import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import logo from "../logo.png";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import { axiosRes } from "../api/axiosDefaults";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const profile_id = currentUser?.profile_id;

  const handleSignOut = async () => {
    try {
      await axiosRes.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const loggedInNavBar = (
    <>
      <NavLink className={styles.Link} to="/">
        Feed
      </NavLink>
      <NavLink className={styles.Link} to="/posts/create">
        Create Post
      </NavLink>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-autoclose-true"
          className={`${styles.Link} custom-dd`}
        >
          <img
            height={40}
            width={40}
            alt="profile pic"
            src={currentUser?.profile_image}
          />
          {currentUser?.username}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            as={NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
          >
            View Profile
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to={`/profiles/${profile_id}/edit`}>
            Edit Profile
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/signout" onClick={handleSignOut}>
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const loggedOutNavBar = (
    <>
      <NavLink className={styles.Link} to="/">
        Feed
      </NavLink>
      <NavLink className={styles.Link} to="/signup">
        Sign up
      </NavLink>
      <NavLink className={styles.Link} to="/signin">
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="lg" fixed="top">
      <Container fluid>
        <NavLink className={styles.Link} to="/">
          <Navbar.Brand className={styles.Brand}>
            <img
              alt="logo"
              src={logo}
              width="35"
              height="35"
              className="d-inline-block my-1 mx-1"
            />
            SportsTalk
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", paddingRight: "5rem" }}
          >
            {currentUser ? loggedInNavBar : loggedOutNavBar}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
