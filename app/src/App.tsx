import { BrowserRouter, Route } from "react-router-dom";
import Foods from "foods/Foods";
import Notifications from "notifications/Notifications";
import Navigation from "shared/components/navigation/Navigation";
import styles from "./app.module.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <header className={styles.header}>
          <Navigation />
          <button className={styles.addButton}>Add new food</button>
        </header>
        <Notifications />
        <div className={styles.container}>
          <Route path="/" component={Foods} />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
