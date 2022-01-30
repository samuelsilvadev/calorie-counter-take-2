import { BrowserRouter, Route } from "react-router-dom";
import Foods from "foods/Foods";
import Notifications from "notifications/Notifications";
import Navigation from "shared/components/navigation/Navigation";
import ContentManager from "shared/components/content-manager/ContentManager";
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
          <Route exact path="/" component={Foods} />
          <Route
            exact
            path="/favorites"
            component={() => (
              <ContentManager
                loading={false}
                error={{
                  error: true,
                  name: "NotImplemented",
                  message: "Favorites are not implemented yet",
                  responseTimestamp: Date.now().toString(),
                  status: true,
                  statusCode: 501,
                }}
              />
            )}
          />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
