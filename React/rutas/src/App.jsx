import "./App.css";
import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";
import Cuiners from "./pages/Cuiners";
import Plats from "./pages/Plats";
import Inici from "./pages/Inici";
import Recepta from "./pages/Recepta";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>Les meves receptes</h1>
          <NavLink exact to="/">Inici</NavLink>
          <NavLink to="/cuiners">Cuiners</NavLink>
          <NavLink to="/plats">Plats</NavLink>
        </nav>
        <Switch>
          <Route exact path="/">
            <Inici />
          </Route>
          <Route path="/cuiners">
            <Cuiners />
          </Route>
          <Route path="/plats">
            <Plats />
          </Route>
          <Route path="/receptes/:id">
            <Recepta />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
