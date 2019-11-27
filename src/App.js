import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Search from "./Routes/Search/Search";
import Dashboard from "./Routes/Dashboard/Dashboard";
import WeeklyCommitGraph from "./Components/WeeklyCommitGraph/WeeklyCommitGraph";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
