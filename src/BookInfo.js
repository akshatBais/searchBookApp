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
      book_img : ''

    };
    this.getBookDescription();
  }

getBookDescription() {
  console.log("Loading Data");
  axios.get('https://www.goodreads.com/book/show/'+this.props.match.params.info+'.xml?key=LsvXe6tyOcFzGePEMDiw')
  .then(resp=> {
    console.log(resp);
    this.setState({data : resp.data});
      parseString(this.state.data, (err, result) => {
        console.log(result);
       this.setState({data : result});
       this.setState({
         authors : this.state.data.GoodreadsResponse.book[0].authors,
         description : this.state.data.GoodreadsResponse.book[0].description,
         avg_rating : this.state.data.GoodreadsResponse.book[0].average_rating
       });
       console.log(this.state.authors);
       console.log(this.state.description);
       console.log(this.state.avg_rating);
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
    <div className="BookInformation">
      <div className="Description">
        {this.state.description}
      </div>
      <div className="Authors">
        {authors}
      </div>
      <div className="AvgRating">
        {this.state.avg_rating}
      </div>


    </div>
  );
  }
}

export default BookInfo;
