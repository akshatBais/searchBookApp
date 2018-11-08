import React, { Component } from 'react';
import './App.css';
import SearchBox from './SearchBox';
import ListBooks from './ListBooks';
import BookInfo from './BookInfo';

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render () {
    return (
          <Router>
            <div>
              <div className="rowspan 12">
                <SearchBox/>
              </div>

              <Route path="/listBooks/:info" component = {ListBooks}   />
              <Route path="/bookDetails/:info" component = {BookInfo}   />

            </div>
          </Router>

    );
  }
}

export default App;
