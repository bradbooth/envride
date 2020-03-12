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

    render() {
        const svgPath = `${tree}#svgView(preserveAspectRatio(none))`;
        return (
            <div>
                <h4>
                    The CO2 saved this trip is equivalent to the 
                    CO2 absorbed by {this.state.numTrees} trees
                </h4>
                <div className="svg-container" >
                    { Array(this.state.numTrees).fill().map( 
                        (x, index) => <img key={index} src={svgPath} width="100px" alt="" />
                    )}
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Equal);
