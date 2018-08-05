import * as graphUtils from './js/graphUtils';

const defaultState = {
    loading: false,
    error: null,
    degrees: [],
    // height: 'auto',
    // width: 'width',
    options: {
        manipulation: {
            enabled:true,
            initiallyActive:true
        },
        
        interaction: {
          dragNodes: true,
          dragView: true,
          hideEdgesOnDrag: false,
          hideNodesOnDrag: false,
          hover: true,
          hoverConnectedEdges: false,
          keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.02 },
            bindToWindow: true,
          },
          multiselect: true,
        //   navigationButtons: true,
          selectable: true,
          selectConnectedEdges: false,
          tooltipDelay: 300,
        //   zoomView: false,
        },
       
        edges: {
            smooth: {
                "forceDirection": "none",
                "roundness": 0.55
            },
            width: 1,
            shadow: false,
            arrows: {
                to: {
                    enabled: false,
                    scaleFactor: 1,
                    type: 'arrow'
                },
                middle: {
                    enabled: false,
                    scaleFactor: 1,
                    type: 'arrow'
                },
                from: {
                    enabled: false,
                    scaleFactor: 1,
                    type: 'arrow'
                }
            }
        },
        physics: {
            "barnesHut": {
                "gravitationalConstant": -1650,
                "springLength": 175,
                "springConstant": 0.05,
                "damping": 0.08,
                "avoidOverlap": 0.14
            },
            "maxVelocity": 13,
            "minVelocity": 0.75,
            "timestep": 0.66
        },
     
        nodes: {
            shape: 'circle',
            shadow: false
        // },
        // manipulation: {
        //     enabled: true,
        //     // initiallyActive: false,
        //     addNode: function(data, callback) {
        //         modal.show("add-node", save.bind(this, data, callback), cancel.bind(this, callback));
        //     },
        //     editNode: function(data, callback) {
        //         modal.setData(data.label);
        //         modal.show("edit-node", save.bind(this, data, callback), cancel.bind(this, callback));
        //     },
        //     addEdge: function(data, callback) {
        //         if (data.from == data.to) {
        //             modal.show("add-self-node", save.bind(this, data, callback), cancel.bind(this, callback));
        //         } else {
        //             modal.show("add-edge", save.bind(this, data, callback), cancel.bind(this, callback));
        //         }
        //     },
        //     editEdge: function(data, callback) {
        //         modal.setData(data.label);
        //         modal.show("edit-edge", save.bind(this, data, callback), cancel.bind(this, callback));
        //     },
            // editNode: undefined,
            // editEdge: true,
            // deleteNode: true,
            // deleteEdge: true,
            
        }
    },


}

export function saveData(data, callback) {
    data.id = document.getElementById('node-id').value;
    data.label = document.getElementById('node-label').value;
    clearPopUp();
    callback(data);
}
export function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}
export function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

let graph_types = [
    "ring",
    "star",
    "complete",
    "linear",
    "cubical",
    "peterson",
    "dürer",
    "desargues",
    "nauru",
    "möbiusKantor",
    "Dodecahedron"
]

let colors = {
    "red": {
        "light": "#f0c370",
        "dark": "#e9a62b"
    },
    "yellow": {
        "light": "#f08370",
        "dark": "#e9472b"
    },
    "blue": {
        "light": "#D2E5FF",
        "dark": "#2B7CE9"
    }
}


export {
    colors,
    graph_types,
    defaultState
}