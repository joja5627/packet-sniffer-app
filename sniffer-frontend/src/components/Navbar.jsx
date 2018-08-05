import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import { FaBars, FaClose } from 'react-icons/lib/fa';

const NavbarIcon = ({ handleClick, isOpen }) => {
  return <span onClick={handleClick}>{isOpen ? <FaClose /> : <FaBars />}</span>;
};

const duration = 300;

const navbarStyle = {
  transition: `width ${duration}ms`
};

const navbarTransitionStyles = {
  entering: {
    width: 0
  },
  entered: {
    width: '300px'
  },
  exiting: {
    width: '300px'
  },
  exited: {
    width: 0
  }
};

const linkStyle = {
  transition: `opacity ${duration}ms`
};

const linkTransitionStyles = {
  entering: {
    opacity: 0
  },
  entered: {
    opacity: 1
  },
  exiting: {
    opacity: 1
  },
  exited: {
    opacity: 0
  }
};

export default class Navbar extends Component {
  state = {
    isOpen: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };
  renderContent(navBarContent) {
    return (
      <Transition in={this.state.isOpen} timeout={duration}>
        {state => (
          <div
            style={{
              ...linkStyle,
              ...linkTransitionStyles[state]
            }}
          >
            {navBarContent}
          </div>
        )}
      </Transition>
    );
  }
  //   <span onClick={handleClick}>{isOpen ? <FaClose /> : <FaBars />}</span>;
  // data-tooltip={data_tooltip}
  render() {
    const { navBarContent, extraClasses, data_tooltip } = this.props;
    return (
      <div className={extraClasses}>
        <div className="navbar-icon">
          <NavbarIcon
            isOpen={this.state.isOpen}
            handleClick={this.toggleNavbar}
          />
        </div>
        {this.state.isOpen && (
          <span className="text-white font-300 padding-l-30">
            Generate Graph
          </span>
        )}

        <Transition in={this.state.isOpen} timeout={duration}>
          {state => (
            <span
              className="navbar"
              style={{
                ...navbarStyle,
                ...navbarTransitionStyles[state]
              }}
            >
              <span className="">{this.renderContent(navBarContent)}</span>
            </span>
          )}
        </Transition>
      </div>
    );
  }
}
