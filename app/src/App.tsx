import { BrowserRouter, Route } from "react-router-dom";
import Foods from "foods/Foods";
import Notifications from "notifications/Notifications";

function App() {
  return (
    <>
      <Notifications />
      <BrowserRouter>
        <Route path="/" component={Foods} />
      </BrowserRouter>
    </>
  );
}

export default App;
