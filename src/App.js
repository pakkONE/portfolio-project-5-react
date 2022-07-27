import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import Home from "./pages/auth/Home";
import Container from "react-bootstrap/esm/Container";
import "./api/axiosDefaults";

function App() {
  return (
    <div className={styles.App}>
      <Container className={styles.Main}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", textAlign: "center" }}>
                <h1>There's nothing here!</h1>
              </main>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
