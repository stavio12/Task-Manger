import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import TaskEdit from "./components/TaskEdit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
if (document.getElementById("root")) {
    ReactDOM.render(
        <Router>
            <Switch>
                <Route exact path="/:id/edit" component={TaskEdit} />
                <App />
            </Switch>
        </Router>,
        document.getElementById("root")
    );
}
