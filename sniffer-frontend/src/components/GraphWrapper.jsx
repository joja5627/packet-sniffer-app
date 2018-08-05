import React from 'react';
import Graph from './Graph.jsx';
import * as graphUtils from '../js/graphUtils';

export default class GraphWrapper extends React.Component {
  constructor(props) {
    super(props);
    const initialGraph = this.props.graph
      ? this.props.graph
      : graphUtils.getScaleFreeNetworkSeeded(graphUtils.getRandomInt(30), graphUtils.seededRandom());
    this.state = {
      network: null,
      graph: { ...initialGraph },
      ...props
    };
    this.getGraphDOM.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.graph)
      this.refreshGraphDOM(newProps.graph.nodes, newProps.graph.edges);
    if (newProps.graphHeight || newProps.graphWidth) {
      let height = newProps.graphHeight;
      let width = newProps.graphWidth;
      this.setState({
        options: {
          height: height,
          width: width
        }
      });
    }
  }
  componentDidMount(){
    graphUtils.editGraphDOM()
  }
  refreshGraphDOM(nodes, edges) {
    this.state.graphDOM.edges.update(edges);
    this.state.graphDOM.nodes.update(nodes);
  }
  refreshGraphDOMSize(width, height) {
    this.state.graphDOM.props.style.height = height;
    this.state.graphDOM.props.style.width = width;
  }
  getGraphDOM() {
    return {
      nodes: this.state.graphDOM.nodes._data,
      edges: this.state.graphDOM.edges._data
    };
  }
  networkInit(network) {
    this.state.network = network;
    let options = this.state.options
    this.state.network.setOptions(options);
   
    this.state.network.on('click', e => {
      let nodesLengthGT0 = e.nodes.length > 0;
      let edgesLengthGT0 = e.edges.length > 0;

      if (nodesLengthGT0) {
        this.props.pushSelectedEdges(null);
        this.props.pushSelectedNodes(e.nodes);
      } else if (edgesLengthGT0) {
        this.props.pushSelectedNodes(null);
        this.props.pushSelectedEdges(e.edges);
      } else if (!edgesLengthGT0 && !nodesLengthGT0) {
        this.props.pushSelectedEdges(null);
        this.props.pushSelectedNodes(null);
      }

      this.state.network.redraw();
    });

    this.state.network.on('doubleClick', e => {});

    this.state.network.on('dragEnd', e => {});

    this.state.network.on('dragStart', e => {});

    this.state.network.on('zoom', e => {});
    this.state.network.once('afterDrawing', () => this.state.network.fit());


    window.addEventListener('resize', () => {
      this.state.network.redraw();
    //   this.state.network.fit();
    });
    // let nodes = this.state.network.nodes;
    // this.state.network.focusOnNode(1,{scale: 1, offset:{x: -(width/3)}});
    // if(options.height && options.width)
    //     this.state.network.moveTo({
    //         position: {x: 0, y: 0},
    //         offset: {x: -options.width/2, y: -options.height/2},
    //         scale: 1,
    //     })
    return network;
  }

  render() {
    return (
      <div>
         {/* <div id="editNodeDialog">
            <button></button>
         </div> */}
       
        <Graph
          style={{
            display: 'inline-block',
            border: 'dashed 3px rgba(255,255,255,.5)',
          }}
          ref={graphDOM => {
            this.state.graphDOM = graphDOM;
          }}
          graph={this.state.graph}
          options={this.state.options}
          getNetwork={this.networkInit.bind(this)}
        />
    
      </div>
    );
  }
}
