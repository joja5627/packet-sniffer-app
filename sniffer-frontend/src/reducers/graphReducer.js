import * as actionTypes from '../actions/actionTypes';
import {defaultState} from '../fixtures';

function graphReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CLEAR_NODES:  
            return {
                ...state,
                nodes:[],
                type:action.CLEAR_NODES,
            };
        case actionTypes.CLEAR_EDGES:
            return {
                ...state,
                edges:[],
                degrees:[],
                type:action.CLEAR_EDGES
            };
        case actionTypes.CLEAR_GRAPH:
            return {
                ...state,
                nodes:[],
                edges:[],
                degrees:[],
                type:action.CLEAR_GRAPH
            };
        case actionTypes.ADD_NODE:
            return {
                ...state,
                addNode:true,
                type:action.ADD_NODE
            };
        case actionTypes.ADD_EDGE:
 
        return {
            ...state,
            nodes:action.result.nodes,
            edges:action.result.edges,
            degrees:action.result.degrees,
            type:action.ADD_EDGE
        };
        case actionTypes.UPDATE_NODE:
        return {
            ...state,
            nodes:action.nodes,
            edges:action.edges,
            degrees:action.degrees,
            type:action.UPDATE_NODE
            };
        case actionTypes.UPDATE_EDGE:

      
        return {
            ...state,
            nodes:action.result.nodes,
            edges:action.result.edges,
            degrees:action.result.degrees,
            type:action.UPDATE_EDGE
            };
        case actionTypes.UPDATE_GRAPH:
        console.log(defaultState)
        const {options} = defaultState;
        console.log(options)
            return {...state,
                        graph:{
                            nodes:action.nodes,
                            edges:action.edges,
                        },
                        degrees:action.degrees,
                        options:options
                        
            };

        case actionTypes.UPDATE_OPTIONS:
            return {
                ...state,
                options:action.result.options,
                type:action.UPDATE_GRAPH,
            };
        case actionTypes.DELETE_NODE:

      
        return {
            ...state,
            nodes:action.result.nodes,
            edges:action.result.edges,
            degrees:action.result.degrees,
            type:action.DELETE_NODE
            };
        case actionTypes.DELETE_EDGE:

        return {
            ...state,
            nodes:action.result.nodes,
            edges:action.result.edges,
            degrees:action.result.degrees,
            type:action.DELETE_EDGE
            };
        case actionTypes.TOGGLE_PIN_GRAPH:

        return {
            ...state,
            options:action.result.options
            };

        default: 
            return state;
    }
}


export default graphReducer