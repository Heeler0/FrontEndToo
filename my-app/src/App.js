import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Application from './views/Application';
import ApplicationAdding from "./views/ApplicationAdding";
import SearchForAppPage from "./views/SearchForAppPage";
import SearchForServicePage from "./views/SearchForServicePage";

export default class App extends Component {

  //Router to different pages
  render() {
    return (
        <Router>
            <Route path="/" exact component={Application} />
            <Route path="/adding" exact component={ApplicationAdding} />
            <Route path="/searchApp" exact component={SearchForAppPage} />
            <Route path="/searchServ" exact component={SearchForServicePage} />
        </Router>
    )
  }
}