import React from "react";
import { Container } from "react-bootstrap";
import styles from "../styles/NotFound.module.css";
import NoResults from "../assets/no-results.png";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.NotFound}>
      <Container>
        {NoResults}
        <p>Unfortunately there is nothing here for you to see.</p>
        <p>
          You can find your way back <Link to={navigate(-1)}>here</Link>
        </p>
      </Container>
    </div>
  );
};

export default NotFound;
