import React, { PropTypes } from 'react';
import omit from 'lodash';
import setClassnames from 'classnames';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      labelClasses: props.labelClasses || ''
    };
  }

  componentDidMount() {
    // let newWidth =  " width-" + this.inputDOM.clientWidth
    // this.setState({
    //   inputWidth: newWidth
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || ''
    });
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = null;
  }

  handlePress(e) {
    if (e.key === 'Enter') {
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
    const changeEvent = { value: e.target.value, name: e.target.name };
    this.setState({ value: changeEvent.value });
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(
      function() {
        this.props.onChange(changeEvent);
      }.bind(this),
      this.props.delay
    );
  }
  getValueWidth(value) {
    if (value) {
      return 'width-' + value;
    } else {
      return '';
    }
  }

  render() {
    const {
      extraClasses,
      placeHolderClasses,
      id,
      label,
      onClick,
      classString,
      classArray,
      className,
      fullWidth,
      type,
      value,
      placeHolder,
      name
    } = this.props;
    let inputClasses;
    if (this.state.value === '')
      inputClasses = extraClasses + placeHolderClasses;
    return (
      <input
        ref={inputDOM => {
          this.inputDOM = inputDOM;
        }}
        type={type}
        name={name}
        value={this.state.value}
        placeholder={placeHolder}
        className={setClassnames({
          [`${extraClasses}`]: !!extraClasses,
          [`${className}`]: !!className
        })}
        onKeyPress={this.handlePress.bind(this)}
        onClick={onClick}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}
Input.propTypes = {
  extraClasses: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  delay: PropTypes.number,
  type: PropTypes.string,
  text: PropTypes.string,
  labelClasses: PropTypes.string
};

Input.defaultProps = {
  delay: 300
};

export default Input;
