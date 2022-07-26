import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/auth/SignUpPage';
import SignInPage from './pages/auth/SignInPage';
import Home from './pages/auth/Home';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route exact path='/signin' element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
