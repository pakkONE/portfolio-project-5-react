import { Button } from "react-bootstrap";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.App}>
      <Button variant="primary">Testing that Bootstrap and Font Awesome Icons works! <i className="fas fa-heart" /></Button>
    </div>
  );
}

export default App;
