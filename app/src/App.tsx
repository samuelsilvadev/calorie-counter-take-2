import { Route, Switch, useLocation } from "react-router-dom";
import Foods from "foods/Foods";
import FoodDetails from "food-details/FoodDetails";
import Notifications from "notifications/Notifications";
import Navigation from "shared/components/navigation/Navigation";
import ContentManager from "shared/components/content-manager/ContentManager";
import styles from "./app.module.css";

function App() {
  const location =
    useLocation<{ previousLocation?: ReturnType<typeof useLocation> }>();
  const previousLocation = location.state?.previousLocation;

  return (
    <main>
      <header className={styles.header}>
        <Navigation />
        <button className={styles.addButton}>Add new food</button>
      </header>
      <Notifications />
      <div className={styles.container}>
        <Switch location={previousLocation || location}>
          <Route exact path="/" component={Foods} />
          <Route
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
        </Switch>
        {previousLocation && (
          <Route path="/details/:id" component={FoodDetails} />
        )}
      </div>
    </main>
  );
}

export default App;
