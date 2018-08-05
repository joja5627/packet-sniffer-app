import React from 'react';
import setClassnames from 'classnames';

/**
 * Renders a styled button to the page.
 * */

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    // this.handleClick = this.handleClick.bind(this);
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
  handleClick = () => {
    this.buttonDOM.blur();
    this.props.clickHandler();
  };


  render() {
    const {
      extraClasses,
      id,
      text,
      isDisabled,
      className,
      children,
      name,
      type,
      data_tooltip,
      parentClickHandler,
      shouldBlur,
      clickHandler

    } = this.props;
    
    return (
      <button
        ref={buttonDOM => {
          this.buttonDOM = buttonDOM;
        }}
        id={id}
        type="button"
        name={name}
        type={type}
        className={setClassnames('btn', {
          [`${extraClasses}`]: !!extraClasses,
          [`${className}`]: !!className,
          'disabled': isDisabled
        })}
        onClick={this.handleClick}
        disabled={isDisabled}
        data-tooltip={data_tooltip}
      >
        {text}
        {children}
      </button>
    );
  }
}
