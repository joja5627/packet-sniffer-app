import React, { Component } from 'react';
import Column from './components/Column';
import Row from './components/Row';
import Button from './components/Button';
import Pin from 'react-icons/lib/go/pin';
import FaTrash from 'react-icons/lib/fa/trash';
import GraphWrapper from './components/GraphWrapper';
import SimpleGraphRequestForm from './components/SimpleGraphRequestForm';
import Resizer from './components/Resizer';
import ToggleDiv from './components/ToggleDiv';
import * as actionTypes from './actions/actionTypes';
import { connect } from 'react-redux';
import * as graphUtils from './js/graphUtils';

import { buildNodePanel, buildEdgePanel, getNeighbors } from './js/graphUtils';

class App extends Component {
  constructor(props) {
    super(props);

    (this.state = {
      dimension: '',
      degrees: null,
      selectedGraphType: '',
      selectedNode: null,
      selectedEdge: null,
      graphDOM: null,
      showDropDown: false,
      graph: { nodes: [], edges: [] },
      ...props
    }),
      (this.selectGraphType = this.selectGraphType.bind(this));
    this.editAttribute = this.editAttribute.bind(this);
    this.clearGraph = this.clearGraph.bind(this);
    this.buildNavBarContent = this.buildNavBarContent.bind(this);
    this.neighborSelected = this.neighborSelected.bind(this);
    this.setSelectedEdges = this.setSelectedEdges.bind(this);
    this.setSelectedNodes = this.setSelectedNodes.bind(this);
    this.clearGraph = this.clearGraph.bind(this);
  }

  componentDidMount() {
    if (this.state.graphWrapperDOM) {
      let graphDOM = this.state.graphWrapperDOM.state.graphDOM;
      this.setState({
        graphDOM: graphDOM
      });
    }
  }
  componentDidUpdate() {}

  componentWillReceiveProps(newProps) {
    this.refreshGraphDOM(newProps.graph.nodes, newProps.graph.edges);
  }
  refreshGraphDOM(nodes, edges) {
    this.state.graphDOM.edges.update(edges);
    this.state.graphDOM.nodes.update(nodes);
  }

  setSelectedNodes(nodes) {
    if (nodes) {
      this.setState({
        selectedNode: graphUtils.getNode(
          this.state.graphDOM.nodes._data,
          nodes[0]
        )
      });
    } else {
      this.setState({
        selectedNode: null
      });
    }
  }
  setSelectedEdges(edges) {
    if (edges) {
      this.setState({
        selectedEdge: graphUtils.getEdge(
          this.state.graphDOM.edges._data,
          edges[0]
        )
      });
    } else {
      this.setState({
        selectedEdge: null
      });
    }
  }
  addCard() {
    const { cards } = this.state;
    const id = cards.length + 1;
    const newCard = {
      id,
      content: `Card ${id}`
    };
    this.setState({
      cards: cards.concat([newCard])
    });
  }

  removeCard(id) {
    const { cards } = this.state;
    this.setState({
      cards: cards.filter(card => card.id !== id)
    });
  }

  removeLastCard() {
    const { cards } = this.state;
    this.setState({
      cards: cards.slice(0, -1)
    });
  }

  clearGraph() {
    this.setState({
      selectedNode: null,
      selectedEdge: null
    });
    Object.keys(this.state.graphDOM.nodes._data).map((node, index) => {
      this.state.graphDOM.nodes.remove(node);
    });
    Object.keys(this.state.graphDOM.edges._data).map((edge, index) => {
      this.state.graphDOM.edges.remove(edge);
    });
  }

  editAttribute(changeEvent) {
    console.log(changeEvent);
    // let changedNode = this.state.selectedNode;
    // changedNode[changeEvent.name] = changeEvent.value;
    // this.setState({
    //   selectedNode: changedNode
    // });
    // this.state.graphDOM.nodes.update(this.state.selectedNode);
  }
  handleGraphClear() {
    this.setState({
      nodes: [],
      edges: []
    });
  }

  pinGraph() {
    let newState = Object.assign({}, this.state);
    newState.options.physics.enabled = !this.state.options.physics.enabled;
    newState.network.setOptions(newState.options);
    this.setState(newState);
  }

  selectGraphType(event) {
    event.preventDefault();
  }
  neighborSelected(neighbor) {
    console.log(neighbor);
  }
  buildNavBarContent() {
    return <div className="graph-button-container">text</div>;
  }

  render() {
    const { selectedEdge, selectedNode } = this.state;
    console.log(selectedEdge, selectedNode);
    let infoPanel = null;
    // console.log(nodes)
    // console.log(edges)
    if (selectedNode) {
      let nodes = this.state.graphDOM.nodes._data;
      let edges = this.state.graphDOM.edges._data;
      console.log(nodes);
      console.log(edges);

      infoPanel = buildNodePanel(
        selectedNode,
        this.editAttribute,
        getNeighbors(nodes, edges, selectedNode.id),
        this.neighborSelected
      );
    } else if (selectedEdge) {
      infoPanel = buildEdgePanel(
        selectedEdge,
        this.editAttribute,
        this.deleteEdge
      );
    }
    const styles = {
      top: this.props.top,
      left: this.props.left,
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div className="justify-content-left margin-l-40 margin-0 padding-0 margin-r-0">
        <Row extraClasses="">
          <Column extraClasses="background-color-opacity-3 graph-visualizer shadow col-8">
            <Row>
              <Column
                ref={resizerColumnDOM => {this.state.resizerColumnDOM = resizerColumnDOM;}}
                extraClasses="margin-t-10">
                <Resizer>
                  <GraphWrapper
                    ref={graphWrapperDOM => {
                      this.state.graphWrapperDOM = graphWrapperDOM;
                    }}
                    options={this.props.options}
                    graphWidth={400}
                    graphHeight={400}
                    pushSelectedNodes={this.setSelectedNodes}
                    pushSelectedEdges={this.setSelectedEdges}
                  />
                </Resizer>
              </Column>
            </Row>
            <Row>
              <Button
                data_tooltip="clear graph"
                extraClasses="has-tooltip point-on-hover background-transparent margin-t-10 color-black"
                name="clear-graph"
                type="button"
                toolTipText="clear graph"
                clickHandler={this.clearGraph.bind(this)}
              >
                <FaTrash color="white" className="icon-size" />
              </Button>
              <Button
                data_tooltip="pin graph"
                extraClasses="point-on-hover background-transparent margin-l-5 margin-t-10"
                name="pin-graph"
                toolTipText="pin graph"
              >
                <Pin color="white" className="icon-size" />
              </Button>
              <div id="landing-1"></div>
            </Row>
          </Column>
          <Column extraClasses="col-3">
            <ToggleDiv
              divChildren={<SimpleGraphRequestForm />}
              buttonChild={
                <Button
                  extraClasses="
                    button-base
                    point-on-hover
                    background-color-opacity-3 
                    graph-visualizer
                    color-white"
                  name="clear-graph"
                  type="button"
                  toolTipText="clear graph"
                >
                  Generate Simple Graph
                </Button>
              }
            />
            <ToggleDiv
              divChildren={<SimpleGraphRequestForm />}
              buttonChild={
                <Button
                  extraClasses="
                    button-base
                    point-on-hover
                    background-color-opacity-3 
                    graph-visualizer
                    color-white"
                >
                  Generate Complex Graph
                </Button>
              }
            />
            <div className="margin-t-30">{infoPanel && infoPanel}</div>
          </Column>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  switch (state.type) {
    case actionTypes.UPDATE_GRAPH:
      const { nodes, edges, degrees } = state.graphReducer;
      return {
        ...state,
        graph: {
          nodes: nodes,
          edges: edges
        },
        degrees: degrees,
        type: actionTypes.UPDATE_GRAPH
      };
    case actionTypes.UPDATE_OPTIONS:
      const { options } = state.graphReducer;
      return {
        ...state,
        options: options
      };
    case actionTypes.ADD_NODE:

    default:
      return state.graphReducer;
  }
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
