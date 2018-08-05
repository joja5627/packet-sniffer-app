import React from 'react';
import PropTypes from 'prop-types';
import setClassNames from 'classnames';

const Column = ({ children, hasOffSet, lineBreak, extraClasses, className }) => (
  <div
  className={setClassNames(
    'col',
      {
        [extraClasses]: extraClasses,
        [className]: className
      }
    )}>
    {children}
    {
      lineBreak &&
        <hr />
    }
  </div>
);

Column.propTypes = {
  children: PropTypes.node,
  lineBreak: PropTypes.bool,
  hasOffSet: PropTypes.bool,
  extraClasses: PropTypes.string,
  className: PropTypes.string
};

export default Column;
