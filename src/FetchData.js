import React from 'react';
import BookDetails from './BookDetails';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class FetchData extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      bookDetails : []
    };
    this.displayDetails = this.displayDetails.bind(this);
  }

  displayDetails(book) {

    console.log(book);
    console.log(book.average_rating);
    console.log(book.best_book[0].author[0].name);


  }

  render() {
    console.log(this.props.info[0]);
    console.log(this.props.info.length);

    const listBooks = this.props.info.map((book) =>
    <Router>
    <div className="BookIntro">
    <Link to="/details" ><img src={book.best_book[0].image_url} alt="no image"/></Link>

     <div className="bookTitle" key={book.id}>{book.best_book[0].title}</div>

      <Route eaxct path="/details"
      render= {
        (props) =>
        <BookDetails info={book} />
       }
      />
      </div>
    </Router>

   );


    return (

      <div className="BookDetails">
          {listBooks}
      </div>
    );


}
}

export default FetchData;
