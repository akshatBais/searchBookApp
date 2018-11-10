import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Link } from "react-router-dom";

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
    console.log("Calling Component will Mount method");
    if ( this.data.bookName !== this.props.match.params.info || this.data.bookName === '') {
      this.getRequiredData();
    }
    this.data.bookName = this.props.match.params.info;
  }


  componentWillUpdate() {
    console.log("Calling componentWillUpdate method");
    console.log("Book keyword searched is : "+this.props.match.params.info);
    if ( this.data.bookName !== this.props.match.params.info || this.data.bookName === '') {
      this.getRequiredData();
    }

    this.count ++;
    console.log(this.count);
    if(this.data.bookName !== this.props.match.params) {
    this.data.bookName = this.props.match.params.info;
    }

  }

  getRequiredData() {
    console.log("Earlier and Current data : "+this.data.bookName+" and "+this.props.match.params.info);
      console.log("Getting the required details");
      axios.get('https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+ this.props.match.params.info)
      .then(resp=> {
          parseString(resp.data, (err, result) => {
            console.log(result);
          // this.data.info = this.data.detailsinXML.GoodreadsResponse.search[0].results[0].work;
           this.setState({info : result.GoodreadsResponse.search[0].results[0].work});
           console.log("getting the required information in state : "+this.state.info);
         });
      });
  }


  render() {


    const listBooks = this.state.info.map((book) =>
     <div  className="col-sm-3" key={book.id[0]._}>
            <div className="card">
                <Link to={"/bookDetails/"+ parseInt(book.id[0]._)}
                params = {{
                  info : parseInt(book.id[0]._)
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
