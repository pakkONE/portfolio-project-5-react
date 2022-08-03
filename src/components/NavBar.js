import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import logo from "../logo.png";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/UserContext";
import { axiosRes } from "../api/axiosDefaults";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const profile_id = currentUser?.profile_id;

  const handleSignOut = async () => {
    try {
      await axiosRes.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      // console.log(error);
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
      <NavLink className={styles.Link} to={`/profiles/${profile_id}`}>
        My profile
      </NavLink>
      <NavLink onClick={handleSignOut} className={styles.Link} to="/">
        Sign Out
      </NavLink>
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
