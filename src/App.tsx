import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.less";
import Indexs from "@pages/indexs";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Indexs />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
