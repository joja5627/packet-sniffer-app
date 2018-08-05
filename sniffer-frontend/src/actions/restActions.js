import {parseResponse} from '../js/graphUtils';
import * as graphActions from './graphActions';
import * as actionTypes from './actionTypes';
import * as restUtils from '../js/restUtils';
 
  
  export const simpleGraphRequestBegin = () => {
      return {
        type: actionTypes.GET_SIMPLE_GRAPH_BEGIN
      }
  };
  export const simpleGraphRequestSuccess = (parsed) => {
      return{
        type: actionTypes.GET_SIMPLE_GRAPH_SUCCESS,
        payload: { parsed }
      }
  };
  export const simpleGraphRequestFailure = error => {
      return {
        type: actionTypes.GET_SIMPLE_GRAPH_FAILURE,
        payload: { error }
      }
  };

  export function simpleGraphRequest(params) {

    return function(dispatch){
      dispatch(simpleGraphRequestBegin());
      return fetch(restUtils.buildURL(params))
        .then(handleErrors)
        .then(response => response.json())
        .then(json => {
          dispatch(simpleGraphRequestSuccess());
          if(json)
            dispatch(graphActions.updateGraph(restUtils.parseResponse(json)))
        })
        .catch(error => dispatch(simpleGraphRequestFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  