import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Staff from "./pages/staff"
import Client from "./pages/client"

import SchedulerPage from "./pages/scheduler";

function App() {
  return (
    <div className="modaresa-app">
      <Router>
        <Switch>
          <Route exact path={["/", "/scheduler"]} component={SchedulerPage} />
          
          <Route exact path="/staffs" component={Staff.ListPage} />
          <Route path="/staffs/create" component={Staff.CreatePage} />
          <Route path="/staffs/:id" component={Staff.UpdatePage} />

          <Route exact path="/clients" component={Client.ListPage} />
          <Route path="/clients/create" component={Client.CreatePage} />
          <Route path="/clients/:id" component={Client.UpdatePage} />

          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
