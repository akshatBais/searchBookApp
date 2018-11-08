import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { Link } from "react-router-dom";

class ListBooks extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bookName : '',
      data : '',
      info : []
    };
    this.getData();
  }

componentDidMount() {
  console.log( this.props.match.params.info);
}

getData() {
  axios.get('https://www.goodreads.com/search/index.xml?key=LsvXe6tyOcFzGePEMDiw&q='+ this.props.match.params.info)
  .then(resp=> {
    this.setState({data : resp.data});
      parseString(this.state.data, (err, result) => {
       this.setState({data : result});
       this.setState({info  : this.state.data.GoodreadsResponse.search[0].results[0].work});
       console.log(this.state.info);
     });
  });
}


render() {

  const listBooks = this.state.info.map((book) =>

    <div className="BookDetails">
       <Link to={
         "/bookDetails/" + JSON.stringify(book.id[0]._)
       }
       params = {{
           bookInfo : book.id[0]
         }}
       ><img src={book.best_book[0].image_url} alt="no image"/></Link>
       <div className="bookTitle" key={book.id}>{book.best_book[0].title}</div>
    </div>



);

  return (

      <div>{listBooks}</div>

  );
}

}


export default ListBooks;
