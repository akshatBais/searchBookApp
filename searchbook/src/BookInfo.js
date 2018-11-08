import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import BookDetails from './BookDetails';

class BookInfo extends React.Component{

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

  return (
    <div>hjwhd
    <BookDetails info={this.state.info} />
    </div>
  );
}

}


export default BookInfo;
