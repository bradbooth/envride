import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './VehicleSelect.css'

import { connect } from "react-redux";

export class VehicleSelect extends Component {

  constructor() {
    super();

    this.state = {
        dropdownOpen: false,
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
        <Dropdown
          className="vehicle-dropdown"
          isOpen={this.state.dropdownOpen} 
          toggle={this.toggle}
          disabled={this.props.values.length === 0} 
        >
            <DropdownToggle
              className="vehicle-dropdown-toggle" 
              caret
              disabled={this.props.values.length === 0} >
            { this.props.label }
            </DropdownToggle>
            <DropdownMenu className="vehicle-dropdown-select">
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
