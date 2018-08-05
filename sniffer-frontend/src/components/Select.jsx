import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import setClassName from 'classnames';

/**
 * Renders a styled button to the page.
 * */

export default class Select extends PureComponent {
  static propTypes = {
    extraClasses: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    id: PropTypes.string,
    text: PropTypes.string,
    children: PropTypes.node,
    onChangeFunction:PropTypes.func,
    optionClasses:PropTypes.string
  };
  render() {
    const {
      extraClasses,
      id,
      className,
      text,
      children,
      options,
      optionClasses,
      onChangeFunction
    } = this.props;

    const selectClass = setClassName(
      
      {
        [extraClasses]: extraClasses,
        [className]: className
      }
    );

    const optionClass = setClassName(
      
      {
        [extraClasses]: optionClasses
      }
    );

    return (
        <select
          className={selectClass}
          onChange={onChangeFunction}>
         {options.map(function (name, index) {
                return <option className={optionClass} key={index} value={name}>{name}</option>
            }, this)
         }
        </select>
    );
  }
}