import React, { Component } from 'react';
import { connect } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import './Chart.css';

const data = {
	labels: [
        'CO2 Emissions Saved',
        'Another label'
	],
	datasets: [{
		data: [70, 30],
		backgroundColor: [
        '#00bf4c',
        '#FF6384'
		],
		hoverBackgroundColor: [
		
		]
	}]
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
            <Doughnut 
                data={data}
                />
        </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
