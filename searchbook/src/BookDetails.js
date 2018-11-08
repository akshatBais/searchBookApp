import React from 'react';

class BookDetails extends React.Component {

render() {
  const listBooks = this.props.info.map((book) =>

    <div>kmelfkj
       <div className="bookImage"><img src={book.best_book[0].image_url} alt="no image"/></div>
       <div className="bookTitle" key={book.id}>{book.best_book[0].title}</div>
    </div>


);
  return (
  <div>{listBooks}</div>
  );
}


}

export default BookDetails;
