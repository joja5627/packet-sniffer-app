import React from 'react';

export default class NodeForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      const { label,attribute } = props;
      this.state = {
        attribute: attribute,
        label:label
      };
     
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <span>
          {this.state.label}
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.attribute} onChange={this.handleChange}  />
            <input type="submit" value="Submit" />
          </form>
          </span>
      );
    }
  }