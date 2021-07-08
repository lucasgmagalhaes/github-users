import "./App.css";
import { Home } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserDetail } from "./pages/UserDetail/UserDetail";

function App() {
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={UserDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
