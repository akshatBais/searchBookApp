import React from "react";

class BookInfo extends React.Component {
  render() {
    console.log(
      "getting the book information of ID : " + this.props.match.params.info
    );
    return <div>hey</div>;
  }
}

export default BookInfo;
