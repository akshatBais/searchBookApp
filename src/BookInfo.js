import React from "react";
import axios from 'axios';
import {parseString} from 'xml2js';

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
    this.getBookDescription();
  }

getBookDescription() {
  console.log("Loading Data");
  axios.get('https://www.goodreads.com/book/show/'+this.props.match.params.info+'.xml?key=LsvXe6tyOcFzGePEMDiw')
  .then(resp=> {
    console.log(resp);
      parseString(resp.data, (err, result) => {
        console.log(result);
       this.setState({
         authors : result.GoodreadsResponse.book[0].authors,
         description : result.GoodreadsResponse.book[0].description,
         avg_rating : result.GoodreadsResponse.book[0].average_rating,
         book_img : result.GoodreadsResponse.book[0].image_url[0]
       });
     });
  });
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
            <img src={this.state.book_img} alt="book"/>
            <br /> by   {authors} <br />  {this.state.avg_rating}
        </div>
        <div className="col-sm-6">
        <br /><br />
          {}
          {this.state.description}
        </div>
    </div>
  </div>
  );
  }
}

export default BookInfo;