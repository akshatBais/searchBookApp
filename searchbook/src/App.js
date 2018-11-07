import React, { Component } from 'react';
import './App.css';
import FetchData from './FetchData';
import axios from 'axios';
import { parseString } from 'xml2js';


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data : '',
      info : []
    };
    this.book = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.book=event.target.value;
  }

  handleSubmit(event) {

    this.setState({value: this.book});
    axios.get('https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+this.book)
    .then(resp=> {
      this.setState({data : resp.data});
        parseString(this.state.data, (err, result) => {
         this.setState({data : result});
         this.setState({info  : this.state.data.GoodreadsResponse.search[0].results[0].work});
         console.log(this.state.info);


  });


    });
    event.preventDefault();
    }


  render() {

    return (

      <div className="App">
        <header className="App-header">
            <form onSubmit={this.handleSubmit}>

            <div className="message">
          Search any book
          </div>

          <div className="searchBox">
            <label>
              <input type="text" ref={this.book} onChange={this.handleChange} />
            </label>

            <input className="btn btn-primary" type="submit" value="Search" onClick={this.handleSubmit}/>
            </div>
            </form>

        </header>

        <FetchData info={this.state.info} />
      </div>
    );

  }
}

export default App;
