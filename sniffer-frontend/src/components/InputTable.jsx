import React, { PropTypes } from "react";
import omit from "lodash";
import setClassnames from "classnames";
import Input from "./Input";

class InputTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }

  handlePress(e) {
    if (e.key === "Enter") {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      const value = e.target.value;
      if (value !== this.props.value) {
        this.props.onChange(value);
      }
      this.props.onEnter(value);
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      function() {
        this.props.onChange(value);
      }.bind(this),
      this.props.delay
    );
  }

  render() {
    const {
      labelClasses,
      extraClasses,
      id,
      label,
      onClick,
      classString,
      classArray,
      className,
      fullWidth,
      type,
      text
    } = this.props;
    // const extendProps = omit(this.props, ['type','value', 'onKeyPress', 'onChange', 'delay']);
    //console.log(this.state.type)

    return (
      <span>
        <span className={labelClasses}>{label}</span>
        <br />
        <input
          type={type}
          value={this.state.value}
          className={setClassnames({
            [`${extraClasses}`]: !!extraClasses,
            [`${className}`]: !!className
          })}
          onKeyPress={this.handlePress.bind(this)}
          onClick={onClick}
          onChange={this.handleChange.bind(this)}
        />
      
      </span>
    );
  }
}
InputTable.propTypes = {
  extraClasses: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  delay: PropTypes.number,
  type: PropTypes.string,
  text: PropTypes.string,
  labelClasses: PropTypes.string
};

InputTable.defaultProps = {
  delay: 300
};

export default InputTable;