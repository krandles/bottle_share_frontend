import React from 'react';
import { Bar } from 'react-chartjs-2';

class ReviewChart extends React.Component {
  state = {
    
  }

  calculateTickStepSize = data => Math.max(data.datasets[0].data) / 4

  render() {
    const data = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        label: '# of Reviews by Rating',
        data: [1, 8, 3, 30, 5],
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
            // stepSize: this.calculateTickStepSize(data),
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Rating'
          }
        }]
      }
    };

    return (
      <Bar data={data} options={options} width="400px" height="250px" />
    );
  }
}

export default ReviewChart;
