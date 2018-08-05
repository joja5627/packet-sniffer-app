import React from 'react';
import setClassnames from 'classnames';

/**
 * Renders a styled button to the page.
 * */

export default class ToolTip extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      isVisible: false
    }),
      this.timer;
  }

  componentWillUnmount() {
    // if (this.timeout) {
    //   clearTimeout(this.timeout);
    // }
    // this.timeout = null;
  }

  handleMouseEnter() {
    this.setState({
      isVisible: true
    });
    // this.timer = setTimeout(() => {
    //   console.log('handleMouseEnter');

    // }, this.props.delayTime);
  }

  handleMouseLeave() {
    // clearTimeout(this.timer);
    this.setState({
      isVisible: false
    });
  }

  render() {
    const { extraClasses, id, text, className, children, name } = this.props;
    let hidden = this.state.isVisible ? '' : ' display-none';
    hidden = 'tooltip-label' + hidden;
    console.log(hidden);
    return (
      <span
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        className={setClassnames({
          [`${extraClasses}`]: !!extraClasses,
          [`${className}`]: !!className
        })}
      >
        <p className={hidden}>{text}</p>
        {children}
      </span>
    );
  }
}
ToolTip.defaultProps = {
  delayTime: 3500
};
