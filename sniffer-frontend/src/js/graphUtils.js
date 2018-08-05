import Column from '../components/Column';
import Row from '../components/Row';
import React, { Component } from 'react';
import MdRemove from 'react-icons/lib/md/remove';
import Label from '../components/Label';
import Button from '../components/Button';
import Input from '../components/Input';
import _ from 'lodash';
import {stripLabel} from './generalUtils';

export function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        }
        else {
          error(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
}
export function getScaleFreeNetwork(dimensions) {
    var nodes = [];
    var edges = [];
    var connectionCount = [];
  
    // randomly create some nodes and edges
    for (var i = 0; i < dimensions; i++) {
      nodes.push({
        id: i,
        label:`Vertex ${i}`
      });
  
      connectionCount[i] = 0;
  
      // create edges in a scale-free-network way
      if (i == 1) {
        var from = i;
        var to = 0;
        edges.push({
          from: from,
          to: to
        });
        connectionCount[from]++;
        connectionCount[to]++;
      }
      else if (i > 1) {
        var conn = edges.length * 2;
        var rand = Math.floor(Math.random() * conn);
        var cum = 0;
        var j = 0;
        while (j < connectionCount.length && cum < rand) {
          cum += connectionCount[j];
          j++;
        }
  
  
        var from = i;
        var to = j;
        edges.push({
          from: from,
          to: to
        });
        connectionCount[from]++;
        connectionCount[to]++;
      }
    }
  
    return {nodes:nodes, edges:edges};
}
var randomSeed = 764; // Math.round(Math.random()*1000);
export function seededRandom() {
    var x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
}
export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
export function getScaleFreeNetworkSeeded(dimensions, seed) {
    if (seed) {
      randomSeed = Number(seed);
    }
    var nodes = [];
    var edges = [];
    var connectionCount = [];
    var edgesId = 0;
  
  
    // randomly create some nodes and edges
    for (var i = 0; i < dimensions; i++) {
      nodes.push({
        id: i,
        label:`Vertex ${i}`
      });
  
      connectionCount[i] = 0;
  
      // create edges in a scale-free-network way
      if (i == 1) {
        var from = i;
        var to = 0;
        edges.push({
        //   label:`Edge ${i}`,
          id: edgesId++,
          from: from,
          to: to
        });
        connectionCount[from]++;
        connectionCount[to]++;
      }
      else if (i > 1) {
        var conn = edges.length * 2;
        var rand = Math.floor(seededRandom() * conn);
        var cum = 0;
        var j = 0;
        while (j < connectionCount.length && cum < rand) {
          cum += connectionCount[j];
          j++;
        }
  
  
        var from = i;
        var to = j;
        edges.push({
          id: edgesId++,
          from: from,
          to: to
        });
        connectionCount[from]++;
        connectionCount[to]++;
      }
    }
  
    return {nodes:nodes, edges:edges};
}
export function getNode(nodes,nodeId){
        return _.find(nodes,{ 'id': nodeId });
}
export function getEdge(edges,edgeId){
        return _.find(edges,{ 'id': edgeId });
}

export function newEdge(from_edge, to_edge, default_color, chosen_color, width, label) {
    var edge = {
      from: from_edge,
      to: to_edge,
      width: width,
      dashes: true,
      color: default_color,
      chosen: {
        edge: function(values, id, selected, hovering) {
          values.width = 2;
          values.color = chosen_color;
          values.dashes = false;
        },
        label: function(values, id, selected, hovering) {}
      }
    };
    return edge;
}

export function newNode(label,nodeId, default_color, chosen_color){
    return {
        chosen: {
            node: function(values, id, selected, hovering) {
              values.width = 2;
              values.color = chosen_color;
              values.dashes = false;
            },
            label: function(values, id, selected, hovering) {}
          },
          shape:'circle',
          color: {
            border: default_color,
            background: default_color
            // highlight: {
            //   border: '#2B7CE9',
            //   background: '#D2E5FF'
            // },
            // hover: {
            //   border: '#2B7CE9',
            //   background: '#D2E5FF'
            // }
          },
          label:label,
          id:nodeId
    }
}

export function getColor(degree) {
    var color = 'red';
    if (degree == '6') {
        color = 'yellow';
    } else if (degree == '10') {
        color = 'red';
    } else if (degree == '16') {
        color = 'blue';
    }
    return color;
}

export function getNeighbors(nodes,edges,nodeIndex) {
    if(edges && nodes && nodeIndex){
      let neighborEdges = _.filter(edges, {from: nodeIndex})
      let neighbors =  _.map(neighborEdges,
                              function(edge){
                                return getNode(nodes,edge.to);
                              });
      return neighbors

    }else{
        return null;
    }
}
export function buildNodePanel(selectedNode,attributeChangeHandler,neighbors,neighborSelectedHandler){
    return (
      <Row extraClasses="padding-5 justify-content-center">
        <Column extraClasses="attribute-header text-center col-12">
          {stripLabel(selectedNode.label)}
          <hr />
        </Column>
        <Column extraClasses="col-4 padding-0">
          <Label
            labelText="attributes"
            labelClasses="label-text-2 margin-0 padding-0"
            innerElements={
              <Column extraClasses="scroll-y">
                {buildFormValues(selectedNode,attributeChangeHandler)}
              </Column>
            }
            innerElementClasses=""
          />
        </Column>
        <Column extraClasses="col-4 padding-0 justify-content-center">
          <Label
            labelText="neighbors"
            labelClasses="label-text-2 margin-0 padding-0 text-center"
            innerElements={
              <Column extraClasses="scroll-y">
                {buildNeighbors(neighbors,neighborSelectedHandler)}
              </Column>
            }
            innerElementClasses=""
          />
        </Column>
      </Row>
    );
}
export function buildEdgePanel(selectedEdge,attributeChangeHandler,deleteEdgehandler) {
    return (
      <Row>
        <Column extraClasses="attribute-header text-center col-12">
          {'Edge'}
          <hr />
        </Column>
        <Column extraClasses="col-4 padding-0">
          <div className="margin-l-40 text-white">
          <Column extraClasses="scroll-y">
            {buildFormValues(selectedEdge,attributeChangeHandler)}
            </Column>
          </div>
        </Column>

        <Column extraClasses="col-4 padding-0 justify-content-center" />

        <Button
          data_tooltip="delete edge"
          extraClasses="point-on-hover background-transparent margin-l-5 margin-t-10"
          name="delete-edge"
          toolTipText="delete edge"
          type="button"
          parentClick={deleteEdgehandler}
        >
          <div class="icon" />
          <span className="letter-style icon-size">E</span>
          <MdRemove color="white" className="upper-icon-size top-right" />
        </Button>
      </Row>
    );
}
export function buildFormValues(inputObject, attributeChangeHandler) {
    return Object.keys(inputObject).map((attribute, index) => {
      if (attribute != 'color') {
        let inputClasses =
          'node-form-base default-placeholder-2 node-count-width  white-form-base maergin margin-l-10';

        if (attribute == 'id') inputClasses = inputClasses + ' input-disabled';
        return (
          <div className="margin-t-5 margin-l-10">
            <Label
              labelText={attribute}
              labelClasses="label-text-3 margin-0 padding-0"
              innerElementsClasses=""
              innerElements={
                <Input
                  value={inputObject[attribute]}
                  extraClasses={inputClasses}
                  key={index}
                  placeholder="none"
                  name={attribute}
                  type="text"
                  onChange={attributeChangeHandler}
                />
              }
            />
          </div>
        );
      }
    });
}
export function buildNeighbors(neighbors,handleSelected) {
     
      return neighbors.map((neighbor,index) => {
        return <Input extraClasses = "inner-text node-form-base "
                    value = {stripLabel(neighbor.label)}
                    key = {index}
                    type = "button"
                    onClick = { () => handleSelected(neighbor)}
                    />;
                })
}
export function setDefaultLocale() {
                var defaultLocal = navigator.language;
                var select = document.getElementById('locale');
                select.selectedIndex = 0; // set fallback value
                for (var i = 0, j = select.options.length; i < j; ++i) {
                  if (select.options[i].getAttribute('value') === defaultLocal) {
                    select.selectedIndex = i;
                    break;
                  }
                }
}
export function editGraphDOM() {
    // var landing1 = document.getElementById("landing-1");
    // var visManElement = document.getElementsByClassName("vis-manipulation")[0];
    // var visManElementCpy = visManElement.cloneNode(true);

    // if(visManElement){
    //     visManElementCpy.parentElement = landing1
    //     visManElement.parentElement.removeChild(visManElement)

    // }
       
}




// export function destroy() {
//                 if (network !== null) {
//                   network.destroy();
//                   network = null;
//                 }
// }   
// export function draw() {
//                 destroy();
//                 nodes = [];
//                 edges = [];
          
//                 // create a network
//                 var container = document.getElementById('mynetwork');
//                 var options = {
//                   layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
//                   locale: document.getElementById('locale').value,
//                   manipulation: {
//                     addNode: function (data, callback) {
//                       // filling in the popup DOM elements
//                       document.getElementById('operation').innerHTML = "Add Node";
//                       document.getElementById('node-id').value = data.id;
//                       document.getElementById('node-label').value = data.label;
//                       document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
//                       document.getElementById('cancelButton').onclick = clearPopUp.bind();
//                       document.getElementById('network-popUp').style.display = 'block';
//                     },
//                     editNode: function (data, callback) {
//                       // filling in the popup DOM elements
//                       document.getElementById('operation').innerHTML = "Edit Node";
//                       document.getElementById('node-id').value = data.id;
//                       document.getElementById('node-label').value = data.label;
//                       document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
//                       document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
//                       document.getElementById('network-popUp').style.display = 'block';
//                     },
//                     addEdge: function (data, callback) {
//                       if (data.from == data.to) {
//                         var r = window.confirm("Do you want to connect the node to itself?");
//                         if (r == true) {
//                           callback(data);
//                         }
//                       }
//                       else {
//                         callback(data);
//                       }
//                     }
//                   }
//                 };
//                 network = new vis.Network(container, data, options);
// }
export function clearPopUp() {
                document.getElementById('saveButton').onclick = null;
                document.getElementById('cancelButton').onclick = null;
                document.getElementById('network-popUp').style.display = 'none';
}

export function saveData(data,callback) {
                data.id = document.getElementById('node-id').value;
                data.label = document.getElementById('node-label').value;
                clearPopUp();
                callback(data);
}

   
  