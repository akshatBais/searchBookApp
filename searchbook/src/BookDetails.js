import React from 'react';
import Parser from 'html-react-parser';

class BookDetails extends React.Component {


  markup (val) {
  		return { __html: val }
  	}

render() {
  console.log(this.props.info[0]);

  return (
    <div dangerouslySetInnerHTML={this.markup(this.props.average_rating)}>
    {this.props.info.average_rating}
    {this.props.info.best_book[0].author[0].name}
    </div>
  );
}


}

export default BookDetails;
