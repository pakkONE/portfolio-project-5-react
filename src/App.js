import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import Container from "react-bootstrap/esm/Container";
import "./api/axiosDefaults";
import CreatePostPage from "./pages/posts/CreatePostPage";
import ViewPostPage from "./pages/posts/ViewPostPage";
import PostList from "./pages/posts/PostList";
import EditPostPage from "./pages/posts/EditPostPage";
import ProfilePage from "./pages/profiles/ProfilePage";
import ChangeUsernameForm from "./pages/profiles/ChangeUsernameForm";
import ChangePasswordForm from "./pages/profiles/ChangePasswordForm";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
  return (
    <div className={styles.App}>
      <Container className={styles.Main}>
        <NavBar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<ViewPostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="/posts/create" element={<CreatePostPage />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route
            path="/profiles/:id/edit/username"
            element={<ChangeUsernameForm />}
          />
          <Route
            path="/profiles/:id/edit/password"
            element={<ChangePasswordForm />}
          />
          <Route
            path="/profiles/:id/edit"
            element={<EditProfileForm />}
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "4rem", textAlign: "center" }}>
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
