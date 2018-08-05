import * as actionTypes from '../actions/actionTypes';
import {defaultState} from '../fixtures';

  
  
  export default function restReducer(state = defaultState, action) {
    
    switch(action.type) {
        
      case `${action.GET_SIMPLE_GRAPH}_REJECTED`:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null,
          nodes:[],
          edges:[],
          degrees:[],
          type:`${action.GET_SIMPLE_GRAPH}_REJECTED`
        };
  
      case `${action.GET_SIMPLE_GRAPH}_SUCCESS`:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
       
        return {
          ...state,
          loading: false,
          error:null,
          type:`${action.GET_SIMPLE_GRAPH}_SUCCESS`
        };
  
      case `${action.GET_SIMPLE_GRAPH}_FAILURE`:
        // The request failed, but it did stop, so set loading to "false".
        // Save the error, and we can display it somewhere
        // Since it failed, we don't have items to display anymore, so set it empty.
        // This is up to you and your app though: maybe you want to keep the items
        // around! Do whatever seems right.
        return {
          ...state,
            loading: false,
            error: true,
            nodes:[],
            edges:[],
            degrees:[],
            type:`${action.GET_SIMPLE_GRAPH}_FAILURE`
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }
