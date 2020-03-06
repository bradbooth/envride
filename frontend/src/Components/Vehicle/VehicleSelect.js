import React, { Component } from 'react';
import './VehicleSelect.css'
import axios from 'axios';

import { connect } from "react-redux";
import VehicleDropdown from './VehicleDropdown';

export class VehicleSelect extends Component {
  
  constructor() {
    super();

    this.state = {
        dropdownOpen: false,
        years: [],
        makes: [],
        models: [],
        options: [],
        year: '',
        make: '',
        model: '',
        option: ''
    };
  }

  componentDidMount(){
      this.getYears()
  }

  getYears = () => {
    this.getValues('year').then( res => {
        this.setState({ years: res })
    })
  }

  getMakes = () => {
    this.getValues('make').then( res => {
        this.setState({
          makes: res,

        })
    })
  }

  getModels = () => {
      this.getValues('model').then( res => {
        this.setState({ 
          models: res,
        })
    })
  }

  getOptions = () => {
      this.getValues('options').then( res => {
        this.setState({ options: res })
    })
  }

  setYear   = (value) => { 
    this.setState({ 
        year: value, 
        makes:   [], make:   '',
        models:  [], model:  '', 
        options: [], option: ''
      }, 
      () => this.getMakes()
    )}
  setMake   = (value) => { 
    this.setState({
      make: value,
      models:  [], model:  '', 
      options: [], option: ''
    }, 
    () => this.getModels()
  )}

  setModel  = (value) => { 
    this.setState({
      model: value,
      options: [], option: ''
    }, 
    () => this.getOptions()
  )}

  setOption = (value) => { this.setState({ option: value}) }


  getValues = (option) => {
    const URL = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/${option}?year=${this.state.year}&make=${this.state.make}&model=${this.state.model}`

    console.log("URL:", URL)
    return axios
        .get(URL)
        .then(response => {
            if ( !response.data ) return []
            const values = Array.isArray(response.data.menuItem) ? response.data.menuItem : [response.data.menuItem]
            return values
        })
  }

  render() {
    return (
      <div>
        
        <VehicleDropdown
            values={this.state.years}
            label={ this.state.year || "Year"}
            set={this.setYear} />

        <VehicleDropdown
            values={this.state.makes}
            label={ this.state.make || "Make"}
            set={this.setMake} />

        <VehicleDropdown
            values={this.state.models}
            label={ this.state.model || "Model"}
            set={this.setModel} />

        <VehicleDropdown
            values={this.state.options}
            label={ this.state.option || "Option"}
            set={this.setOption} />
        
      </div>
    );
  }

}

export default connect()(VehicleSelect);
