import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import SubmitReview from './components/SubmitReview.jsx'
import ReviewsList from './components/ReviewsList.jsx';
import { indexStyling } from '../style.js';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || 1,
      reviews: []
    }
  }

  getReviews() {
    Axios.get(`/query/reviews/${this.state.id}`)
      .then((data) => {
        this.setState({
          reviews: data.data
        })
      })
  }

  componentDidMount() {
    this.getReviews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) {
      this.getReviews();
    }
  }

  render() {
    return (
      <div style={indexStyling}>
        <SubmitReview adventure_id={this.state.id} getReviews={this.getReviews.bind(this)} />
        <ReviewsList reviews={this.state.reviews} />
      </div>
    );
  }
}

ReactDOM.render(<Reviews />, document.getElementById('reviews'));

export default Reviews