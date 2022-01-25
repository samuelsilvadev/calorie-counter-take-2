import { BrowserRouter, Route } from "react-router-dom";
import Foods from "foods/Foods";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Foods} />
    </BrowserRouter>
  );
}

export default App;
