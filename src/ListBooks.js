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
  }

componentWillMount() {
  console.log( this.props.match.params.info);
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
   <div  className="col-sm-3">
          <div class="card">
              <Link to={"/bookDetails/"+ parseInt(book.id[0]._)}
              params = {{
                info : parseInt(book.id[0]._)
              }}
              >
                <img class="card-img-top" src={book.best_book[0].image_url} alt="no"/>
                <h6 class="card-title">
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
