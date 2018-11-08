import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.book = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(event) {
      this.book=event.target.value;
      this.setState({value : this.book});
    }

  render() {

    return (

      <div className="App">
        <header className="App-header">
            <div className="searchBox">
             Welcome to BetterReads !!  <br /> <br />
                <input type="text" ref={this.book}  placeholder="search books" onChange={this.handleChange}/>
              <button>
                  <Link to={
                    "/listBooks/" + this.state.value
                  }
                  params = {{
                      info : this.book
                    }}
                  >
                  Search
                  </Link>
              </button>
            </div>
        </header>
      </div>
    );

  }
}

export default SearchBox;
