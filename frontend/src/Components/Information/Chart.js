import React, { Component } from 'react';
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import './Chart.css';

let days = []
for(let i=1; i<30; i++){
    days.push(i)
}

let co2Saved = []
let sum = 0
for(let i=1; i<30; i++){
    sum = sum + ( Math.random() * 3 )
    co2Saved.push( sum )
}
const data = {
    labels: days,
    datasets: [
      {
        label: "Total CO2 saved as a community",
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(0, 191, 51,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: co2Saved
      }
    ]
  };


export class Chart extends Component {

    constructor() {
        super();
        this.state = {
        
        }
    }

    render() {
        return (
        <div className="">
            <Line data={data} />
        </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
