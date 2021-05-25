import React, { Component } from "react";
import { withTaskContext } from "@twilio/flex-ui";

class CustomerName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.task.attributes.name,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  updateName() {
    const { task } = this.props;
    const attributes = { ...task.attributes, name: this.state.name };
    task.setAttributes(attributes);
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="customer-name">Name</label>
          <input
            type="text"
            id="customer-name"
            name="customer-name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>
        <div>
          <button onClick={this.updateName}>Save</button>
        </div>
      </div>
    );
  }
}

export default withTaskContext(CustomerName);
