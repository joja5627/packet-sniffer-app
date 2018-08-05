import * as actionTypes from './actionTypes';

  export const clearNodes = () => {
      return {
        type: actionTypes.CLEAR_NODES
      }
    
  };
  export const clearEdges = () => {
      return {
        type: actionTypes.CLEAR_EDGES
      }
    
  };
  export const clearGraph = () => {
      return {
        type: actionTypes.CLEAR_GRAPH
      }
    
  };

  export const addNode = () => {
      return {
            addNode: true,
            type: actionTypes.ADD_NODE,
          }
    };
  
  export const addEdge = () => {
      return {
        type: actionTypes.ADD_EDGE
      }
    
  };
  export const updateNode = () => {
      return {
        type: actionTypes.UPDATE_NODE
      }
    
  };
  export const updateEdge = () => {
      return {
        type: actionTypes.UPDATE_EDGE
      }
    
  };
  export const updateGraph = (res) => {
      console.log(res)
    const{nodes,edges,degrees} = res
    return {
     
      nodes: nodes,
      edges: edges,
      degrees:degrees,
      type: actionTypes.UPDATE_GRAPH
    };
  };
  
  export const updateOptions = (res) => {
    const{options} = res
    return {
    
     options:options,
      type: actionTypes.UPDATE_OPTIONS
    };
  };
  export const deleteNode = () => {
      return {
        type: actionTypes.DELETE_NODE
      }
    
  };
  export const deleteEdge = () => {
      return {
        type: actionTypes.DELETE_EDGE 

      }
    
  };

