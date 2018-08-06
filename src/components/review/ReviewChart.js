import React from 'react';
import { Bar } from 'react-chartjs-2';

class ReviewChart extends React.Component {
  state = {
    reviewData: [0, 0, 0, 0, 0]
  }

  // componentDidMount() {
  //   this.calculateData(this.props.reviews);
  // }

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.calculateData(this.props.reviews);
    }
  }

  calculateData = (reviews) => {
    const ratings = [0, 0, 0, 0, 0];
    for (let i = 0; i < reviews.length; i++) {
      console.log(ratings);
      ratings[reviews[i].rating - 1]++;
    }
    this.setState({
      reviewData: ratings
    });
  }


  render() {
    const data = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        label: '# of Reviews by Rating',
        data: this.state.reviewData,
        border: 'none',
        backgroundColor: '#2986CE'
      }]
    };

    const options = {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '# of Reviews'
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Rating'
          },
          gridLines: {
            display: false
          }
        }]
      }
    };

    return (
      <Bar data={data} options={options} width={400} height={250} />
    );
  }
}

export default ReviewChart;
