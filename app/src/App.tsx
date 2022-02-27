import { Route, Switch, useLocation, Link } from "react-router-dom";
import Foods from "foods/Foods";
import FoodDetails from "food-details/FoodDetails";
import NewFood from "new-food/NewFood";
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
        <Link className={styles.addButton} to="/new-food">
          Add new food
        </Link>
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
          <Route path="/new-food" component={NewFood} />
        </Switch>
        {previousLocation && (
          <Route path="/details/:id" component={FoodDetails} />
        )}
      </div>
    </main>
  );
}

export default App;
