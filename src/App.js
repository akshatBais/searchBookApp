import React, { Component } from 'react';
import './App.css';
import SearchBox from './SearchBox';
import ListBooks from './ListBooks';
import BookInfo from './BookInfo';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {



  render () {
    return (
          <Router>
          <div className="Home">
            <div className="welcome">
              <h1><strong>Welcome to <Link to="/home">BetterReads !!</Link></strong></h1>
            </div>
            <div>
              <Route path="/" component = {SearchBox} />
            </div>
              <Route path="/listBooks/:info" component = {ListBooks}   />
              <Route path="/bookDetails/:info" component = {BookInfo}   />


            </div>
          </Router>

    );
  }
}

export default App;
