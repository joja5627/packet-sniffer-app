import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import setClassnames from 'classnames';

/**
 * Renders a styled button to the page.
 * */

export default class P extends PureComponent {
  static propTypes = {
    extraClasses: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node
  };
  render() {
    const {
      extraClasses,
      id,
      className,
      text,
      children
    } = this.props;

    return (
      <p
        id={id}
        className={setClassnames(
          {
            [`${extraClasses}`]: !!extraClasses,
            [`${className}`]: !!className,
            
          })}
        >
         {text}
         {children}
      </p>
    );
  }
}