import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Link } from "react-router-dom";
import fetch from "node-fetch";
import request from 'sync-request';

class ListBooks extends React.Component{

    constructor(props) {
      super(props);
      this.data = {
        bookName : '',
        info : []
      };
      this.count = 0;

      this.state = {
        info : []
      };
      this.getRequiredData = this.getRequiredData.bind(this);

    }

  componentWillMount() {
//    console.log("Calling Component will Mount method");
    if ( this.data.bookName !== this.props.match.params.info || this.data.bookName === '') {
      this.getRequiredData();
    }
    this.data.bookName = this.props.match.params.info;
  }


  componentWillUpdate() {
//    console.log("Calling componentWillUpdate method");
    console.log("Book keyword searched is : "+this.props.match.params.info);
    if ( this.data.bookName !== this.props.match.params.info || this.data.bookName === '') {
      this.getRequiredData();
    }
    if(this.data.bookName !== this.props.match.params) {
    this.data.bookName = this.props.match.params.info;
    }

  }

  getRequiredData() {
  //  console.log("Earlier and Current data : "+this.data.bookName+" and "+this.props.match.params.info);
      console.log("Getting the required details");

        var rep = request('GET','/getBooks?q='+this.props.match.params.info);
        console.log(JSON.parse(rep.getBody()));
        this.setState({info : JSON.parse(rep.getBody())});
        console.log(this.state.info);

  }


  render() {

console.log(this.state.info);
    const listBooks = this.state.info.map((book) =>
     <div  className="col-sm-3" key={book.id[0]._}>
            <div className="card">
                <Link to={"/bookDetails/"+ parseInt(book.best_book[0].id[0]._)}
                params = {{
                  info : parseInt(book.best_book[0].id[0]._)
                }}
                >
                  <img className="card-img-top" src={book.best_book[0].image_url} alt="no"/>
                  <h6 className="card-title">
                    {book.best_book[0].title}
                  </h6>
                </Link>
            </div>
      </div>

  );

      return (
          <div className="row">{listBooks}</div>
      );
  }
}


export default ListBooks;
