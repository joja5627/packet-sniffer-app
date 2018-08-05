import React from 'react';
import PropTypes from 'prop-types';
import setClassName from 'classnames';

/**
 * Use to render a main container div
 * */
function Container({ children, extraClasses, className, wide }) {
  const containerClass = setClassName(
    'container',
    {
      [extraClasses]: extraClasses,
      'container-wide': wide,
      [className]: className
    }
  );
  return (
    <div className={containerClass}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  wide: PropTypes.bool
};

export default Container;

