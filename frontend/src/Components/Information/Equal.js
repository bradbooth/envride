import React, { Component } from 'react';
import { connect } from "react-redux";
import tree from  './tree.svg'
import './Equal.css';

export class Equal extends Component {

    constructor() {
        super();
        this.state = {
            numTrees: 5
        }
    }

    getCalculation = () => {
        const distanceInMeters = this.props.data.distance ? this.props.data.distance : 0
        const co2GperMiles = this.props.data.co2.co2TailpipeGpm ? this.props.data.co2.co2TailpipeGpm : 0 
        const co2GperKm = co2GperMiles / 1.609
        const distanceInMiles = distanceInMeters / 1609
        const totalCO2G = co2GperMiles * distanceInMiles

        const youngTreeCO2G = 5900

        return (totalCO2G / youngTreeCO2G).toFixed(2)
    }


    getTotalCo2 = () => {
        if ( this.props.data.distance && this.props.data.co2.co2TailpipeGpm){
            return ((this.props.data.co2.co2TailpipeGpm / 1.609) * (this.props.data.distance/1000) ).toFixed(2)
        }
        return 0
    }

    render() {
        const svgPath = `${tree}#svgView(preserveAspectRatio(none))`;
        return (
            <div>
                <h4>
                    The CO2 used this trip is equivalent to the carbon sequestration amount of 
                    {" " + this.getCalculation() + " "} young trees over the course of a year
                </h4>
                <div className="svg-container" >
                    { Array( Math.ceil(this.getCalculation()) ).fill().map( 
                        (x, index) => <img key={index} src={svgPath} width="100px" alt="" />
                    )}
                </div>
                <br />
                <h3>Trip Details</h3>
                <h4>
                    Distance: {this.props.data.distance ? this.props.data.distance : 0 } m

                </h4>
                <h4>
                    CO2: {this.props.data.co2.co2TailpipeGpm ? (this.props.data.co2.co2TailpipeGpm / 1.609).toFixed(2) : 0 } g/km
                </h4>
                <h4>
                    Total CO2: {this.getTotalCo2() } g
                </h4>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Equal);
