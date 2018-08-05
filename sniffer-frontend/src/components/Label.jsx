import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import setClassnames from 'classnames';

/**
 * Renders a styled button to the page.
 * */

class Label extends React.PureComponent {
  static propTypes = {
    labelClasses: PropTypes.string,
    labelText: PropTypes.string,
    extraClasses: PropTypes.string,
    innerElementsClasses: PropTypes.string,
    innerElements: PropTypes.node
  };
  //   constructor(props) {
  //     super(props);
  //     // console.log(props);
  //   }

  render() {
    const {
      labelText,
      labelClasses,
      innerElements,
      innerElementClasses
    } = this.props;

    // console.log(labelClasses);
    // console.log(innerElements);
    // console.log(innerElementClasses);

    return (
      <span>
        <p className={labelClasses}>{labelText}</p>
        <span className={innerElementClasses}>{innerElements}</span>
      </span>
    );
  }
}
export default Label;
