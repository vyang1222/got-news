import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import Home from "./Home/Home.js";
import News from "./News/News.js";
import "./index.scss";

const App = () => {
  const history = useHistory();
  const [endpoint, setEndpoint] = useState("");
  const [category, setCategory] = useState("");

  const changeEndpoint = (endpoint) => {
    setEndpoint(endpoint);
  };

  const changeCategory = (category) => {
    setCategory(category);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home
          history={history}
          category={category}
          changeCategory={changeCategory}
          endpoint={endpoint}
          changeEndpoint={changeEndpoint}
        />
      </Route>
      <Route exact path="/news/">
        <News category={category} changeCategory={changeCategory} endpoint={endpoint} changeEndpoint={changeEndpoint} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
