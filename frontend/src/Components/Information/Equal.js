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

        return 5
    }

    render() {
        const svgPath = `${tree}#svgView(preserveAspectRatio(none))`;
        return (
            <div>
                <h4>
                    The CO2 saved this trip is equivalent to the 
                    CO2 absorbed by {this.getCalculation()} trees
                </h4>
                <div className="svg-container" >
                    { Array(this.state.numTrees).fill().map( 
                        (x, index) => <img key={index} src={svgPath} width="100px" alt="" />
                    )}
                </div>
                <h4>
                    Distance: {this.props.data.distance ? this.props.data.distance : 0 } m

                </h4>
                <h4>
                CO2 Gpm: {this.props.data.co2.co2TailpipeGpm ? this.props.data.co2.co2TailpipeGpm : 0 }
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
