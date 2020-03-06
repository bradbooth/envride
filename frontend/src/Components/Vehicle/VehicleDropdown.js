import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './VehicleSelect.css'

import { connect } from "react-redux";

export class VehicleSelect extends Component {

  constructor() {
    super();

    this.state = {
        dropdownOpen: false,
        label: '',
        values: []
    };
  }

  setLabel = (e) => {
      const value = e.currentTarget.textContent
      this.setState({
          label: value
      })
      this.props.set(value)
  }

  toggle = () => this.setState({dropdownOpen: !this.state.dropdownOpen})

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.props.label }
            </DropdownToggle>
            <DropdownMenu className="vehicle-select-dropdown">
            {
                this.props.values.map(x => (
                    <DropdownItem 
                        key={x.text}
                        onClick={this.setLabel}>{x.text}
                    </DropdownItem>))
            }
            </DropdownMenu>
        </Dropdown>
      </div>
    );
  }

}

export default connect()(VehicleSelect);
