import React from 'react'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import {render} from 'react-dom'

export function Card ({children, onRemove}) {
    return (
      <div className="card">
        {children}
        <button onClick={onRemove}>Remove</button>
      </div>
    )
  }
  
export function FadeTransition ({children, duration, in: inProp}) {
    const defaultStyle = {
      transition: `${duration}ms ease-in`,
      transitionProperty: 'opacity, transform'
    }
  
    const transitionStyles = {
      entering: {
        opacity: 0,
        transform: 'translateY(-10%)'
      },
      entered: {
        opacity: 1,
        transform: 'translateY(0)'
      },
      exiting: {
        opacity: 0,
        transform: 'translateY(-10%)'
      }
    };
  
    return (
      <Transition in={inProp} timeout={{
        enter: 0,
        exit: duration
      }}>
        {
          (state) => {
            if (state === 'exited') {
              return null;
            }
  
            return React.cloneElement(children, {
              style: Object.assign({}, defaultStyle, transitionStyles[state])
            })
          }
        }
      </Transition>
    )
  }
  
export function Board ({children}) {
    return (
      <ul className="board">
        {children}
      </ul>
    )
  }
  