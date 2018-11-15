import React from "react";
import axios from 'axios';
import {parseString} from 'xml2js';
import request from 'sync-request';

class BookInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data : '',
      authors : [],
      description : '',
      avg_rating : '',
      book_img : '',
      bookName : ''

    };

    this.data = {
      info : []
    };

  }


componentWillMount() {
  console.log("component will mount");
  console.log("Loading Data in getBookDescription");
  console.log(this.props.match.params.info);
  var rep = request('GET','https://searchbookapp.herokuapp.com/getDetails?q='+parseInt(this.props.match.params.info));
  this.data.info = JSON.parse(rep.getBody());
  console.log(this.data.info);

  this.setState({
         authors : this.data.info.GoodreadsResponse.book[0].authors,
         description :JSON.parse(rep.getBody()).GoodreadsResponse.book[0].description[0],
         avg_rating : this.data.info.GoodreadsResponse.book[0].average_rating,
         book_img : this.data.info.GoodreadsResponse.book[0].image_url[0],
         bookName : this.data.info.GoodreadsResponse.book[0].title
       });
}

componentDidMount() {
  this._isMount = true;
  console.log("Component is mounted");
}

componentWillUnmount() {

this._isMount = false;
console.log("component will unmount");
}
  render() {
    const authors = this.state.authors.map(author =>
        <div className="authorName">{author.author[0].name}</div>
    )
    console.log(
      "getting the information for book id : " + parseInt(this.props.match.params.info)
    );
    return (
  <div>
    <div className="row">
        <div className="col-sm-4">
            <img className= "book_img" src={this.state.book_img} alt="book"/>

        </div>
        <div className="col-sm-6">
        <br /><br />
          <strong><h3>{this.state.bookName}</h3></strong>
          <br />
           by <b>  {authors} </b> <strong>Average Rating : </strong> {this.state.avg_rating}
          <br /><br/>
          <div dangerouslySetInnerHTML={{ __html: this.state.description }} />

        </div>
    </div>
  </div>
  );
  }
}

export default BookInfo;
