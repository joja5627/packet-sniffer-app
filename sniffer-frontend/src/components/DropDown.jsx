import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { IoChevronDown, IoChevronUp } from 'react-icons/lib/io';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

class DropDown extends Component {
  constructor(props) {
    super(props);
    const { defaultPlaceholderValue } = this.props;
    this.state = {
      selected: props.value || {
        label:
          typeof props.placeholder === 'undefined'
            ? defaultPlaceholderValue
            : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value });
    } else if (!newProps.value) {
      this.setState({
        selected: {
          label:
            typeof newProps.placeholder === 'undefined'
              ? DEFAULT_PLACEHOLDER_STRING
              : newProps.placeholder,
          value: ''
        }
      });
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleMouseDown(event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  setValue(value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
    this.forceUpdate();
  }

  renderOption(option) {
    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': option === this.state.selected
    };

    const optionClass = classNames(classes);

    let value = option.value;
    if (typeof label != this.defaultPlaceholderValue) {
      value = option.label || option;
    }
    let label = option.label || option.value || option;

    return (
      <span
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
      >
        {label}
      </span>
    );
  }

  buildMenu() {
    let { options, baseClassName } = this.props;
    let ops = options.map(option => {
      if (option.type === 'group') {
        let groupTitle = (
          <div className={`${baseClassName}-title`}>{option.name}</div>
        );
        let _options = option.items.map(item => this.renderOption(item));

        return (
          <p className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </p>
        );
      } else if (option != this.state.selected) {
        return this.renderOption(option);
      }
    });

    return ops.length ? (
      ops
    ) : (
      <div className={`${baseClassName}-noresults`}>No options found</div>
    );
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false });
        }
      }
    }
  }

  render() {
    const {
      baseClassName,
      controlClassName,
      activePlaceholderClassName,
      defaultPlaceholderClassName,
      defaultPlaceholderValue,
      menuClassName,
      arrowClassName,
      className,
      extraClasses
    } = this.props;

    const disabledClass = this.props.disabled ? 'dropdown-disabled' : '';
    const activePlaceholderValue =
      typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label;

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [extraClasses]: extraClasses,
      [className]: !!className,
      'is-open': this.state.isOpen
    });
    let controlClass = classNames({
      [`${baseClassName}-control`]: true,
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass
    });
    controlClass =
      controlClass +
      ' node-count-width  white-form-base label-text float-right';
    if (this.state.selected.value != '') {
      controlClass = controlClass + ' padding-t-6 padding-b-1';
    }
    const defaultPlaceholder = classNames({
      [`${baseClassName}-default-placeholder`]: true,
      [defaultPlaceholderClassName]: !!defaultPlaceholderClassName
    });
    const activePlaceholder = classNames({
      [`${baseClassName}-active-placeholder`]: true,
      [activePlaceholderClassName]: !!activePlaceholderClassName
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    });

    const placeholder =
      this.state.selected.value == '' ? (
        <span className={defaultPlaceholder}>{defaultPlaceholderValue}</span>
      ) : (
        <span className={activePlaceholder}>{activePlaceholderValue}</span>
      );
    // const menu = this.state.isOpen ? (
    //   <div className={menuClass}>{}</div>
    // ) : null;

    return (
      <span className={dropdownClass}>
        <span className={controlClass}>
          <span>{placeholder}</span>
          <span className="float-right">
            {this.state.isOpen ? (
              <IoChevronUp
                onMouseDown={this.handleMouseDown.bind(this)}
                onTouchEnd={this.handleMouseDown.bind(this)}
                className=""
                color="white"
              />
            ) : (
              <IoChevronDown
                onMouseDown={this.handleMouseDown.bind(this)}
                onTouchEnd={this.handleMouseDown.bind(this)}
                className=""
                color="white"
              />
            )}
          </span>
        </span>
        {this.state.isOpen && <span>{this.buildMenu()}</span>}
      </span>
    );
  }
}

DropDown.propTypes = {
  baseClassName: PropTypes.string,
  extraClasses: PropTypes.string,
  controlClassName: PropTypes.string,
  menuClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  className: PropTypes.string
};

DropDown.defaultProps = { baseClassName: 'Dropdown' };

export default DropDown;
