import React, { PropTypes } from 'react'
import Graph from 'react-graph-vis'


class NetworkGraph extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      nodes: [],
      edges: [],
      moveMode: false,
      networkButtons: {
        addNode: false,
        editNode: false,
        checkNeighbours: false,
        deleteElements: false,
        addEdge: false
      },
      actionHint: false,
      modal: false,
      node: {},
      edge: {},
      e: {
        pointer: {
          canvas: {
            x: 3139.0571737074524,
            y: 2191.9180225526757
          }
        }
      },
      addingEdge: false,
      marker: null,
      search_text: '',
      search_results: [],
      search_cursor: 0,
      neighbourNetworkGraph: null,
      options: {
        autoResize: true,
        height: '100%',
        width: '100%',
        edges: {
          arrows: {
            to: {
              enabled: false
            }
          },
          smooth: false,
          width: 5
        },
        nodes: {
          shape: 'circularImage',
          shadow: {
            enabled: true
          },
          scaling: {
            min: 10,
            max: 1000,
            label: {
              enabled: true,
              min: 30,
              max: 80,
              maxVisible: 100,
              drawThreshold: 1
            }
          },
          size: 100,
          font: {
            size: 30
          },
          color: {
            highlight: {
              border: 'lime'
            }
          }
        },
        physics: false,
        interaction: {
          dragNodes: false,
          keyboard: {
            enabled: true,
          }
        }
      }
    }

    this.startPosition = { position: { x: 3139.0571737074524, y: 2191.9180225526757 }, scale: 0.025 }
  }

  componentWillMount() {
    this.refreshNetwork()
  }

  networkOnInit(network) {

    this.network = network
    this.network.once('afterDrawing', () => {
      setTimeout(() => {
        let nodeIds = this.state.nodes.map(node => node.id)
        this.network.fit({
          nodes: nodeIds,
          animation: true
        })
      }, 500)

    })

    this.network.manipulation.options.addEdge = this.addEdge.bind(this)
    this.network.on('click', (e) => {
      this.resetNetworkButtons()
      this.controlClick(e)
    })

    this.network.on('doubleClick', (e) => {
      this.resetNetworkButtons()
      this.controlDoubleClick(e)
    })

    this.network.on('dragEnd', (e) => {
      this.controlDragEnd(e)
    })

    this.network.on('dragStart', (e) => {
      this.resetNetworkButtons()
    })

    this.network.on('zoom', (e) => {
      this.resetNetworkButtons()
    })

    window.addEventListener("resize", () => {
      this.network.redraw()
    })

  }



  controlClick(e) {

    this.setState({
      e: e,
      actionHint: false,
      search_text: '',
      search_results: []
    })
    this.network.disableEditMode()
    let selection = this.network.getSelection()

    if (selection.nodes.length === 0 && selection.edges.length === 0) {
      this.network.moveTo({
        position: {
          x: e.pointer.canvas.x,
          y: e.pointer.canvas.y
        },
        animation: {
          duration: 500,
          easingFunction: 'easeOutCubic'
        }
      })

      setTimeout(() => {
        this.setState({
          networkButtons: {
            addNode: true,
            editNode: false,
            deleteElements: false,
            addEdge: false
          }
        })
      }, 550)
    }
  }

  controlDoubleClick(e) {

    this.setState({
      e: e,
      actionHint: false,
      search_text: '',
      search_results: []
    })
    this.network.disableEditMode()
    let selection = this.network.getSelection()
    if (selection.nodes.length === 1) {
      this.network.focus(selection.nodes[0], {
        scale: 0.75,
        animation: {
          duration: 500,
          easingFunction: 'easeOutCubic'
        }
      })
    }
    else if (selection.edges.length === 1) {

      this.network.moveTo({
        position: {
          x: e.pointer.canvas.x,
          y: e.pointer.canvas.y
        },
        scale: 0.75,
        animation: {
          duration: 500,
          easingFunction: 'easeOutCubic'
        }
      })
    }
    setTimeout(() => {
      this.toggleNetworkButtons(e)
    }, 500)
  }

  controlDragEnd(e) {

    if (this.state.mode === 'move' && e.nodes.length === 1) {
      let node = {
        id: e.nodes[0],
        x: e.pointer.canvas.x,
        y: e.pointer.canvas.y
      }
      // axios.put(SERVER_URL + '/api/networkgraph/movenode', node)
      //   .then((response) => {
      //     console.log(response.data)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }








  moveCursorOnResults(e) {

    let { search_results, search_cursor } = this.state
    let newCursorPosition
    if (this.state.search_results.length > 0) {
      if (e.keyCode === 38 && search_cursor > 0) { //up
        newCursorPosition = this.state.search_cursor - 1
        this.setState(prevState => ({
          search_cursor: prevState.search_cursor - 1
        }))
        console.log(newCursorPosition)
      }
      else if (e.keyCode === 40 && search_cursor < search_results.length - 1) { //down
        newCursorPosition = this.state.search_cursor + 1
        this.setState(prevState => ({
          search_cursor: prevState.search_cursor + 1
        }))
        console.log(newCursorPosition)
      }
      else if (e.keyCode === 13) { //down
        this.focusSearch(this.state.search_results[this.state.search_cursor])
      }

    }
  }

  focusSearch(node) {

    this.network.moveTo({
      position: { x: node.x, y: node.y },
      scale: 0.75,
      animation: {
        duration: 250,
        easingFunction: 'easeInOutCubic'
      }
    })
    this.network.unselectAll()
    this.network.selectNodes([node.id])
    this.setState({
      search_text: '',
      search_results: [],
      search_cursor: 0,
      actionHint: ''
    })

    this.toggleNetworkButtons({ nodes: [node.id] })
  }


  showNetworkGraphHeader() {

    return (
      <div id='network-graph-header'>
        {this.lockUnlockController()}
        <input
          id='find-networkgraph'
          type="text"
          className="form-control pull-right"
          placeholder="Find..."
          value={this.state.search_text}
          onChange={(e) => { this.filterResults(e) }}
          onKeyDown={(e) => { this.moveCursorOnResults(e) }}
        />
      </div>
    )
  }


  showActionHint() {
    return (
      this.state.actionHint ? <div id='action-hint' className='alert-success'>{this.state.actionHint}</div> : null
    )
  }

  closeNeighbourNetwork() {
    this.setState({ neighbourNetworkGraph: null })
  }

  render() {
    const {
      labelClasses,
      extraClasses,
      id,
      label,
      onClick,
      classString,
      classArray,
      className,
      fullWidth,
      type,
      value,
      edges,
      nodes
      
    } = this.props;

    return (
      <div>
        <Graph
          options={this.state.options}
          graph={graph}
          getNetwork={this.networkOnInit.bind(this)}
        />
      </div>
    )
  }
}
NetworkGraph.propTypes = {
  graph:PropTypes.dict,
  extraClasses: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  delay: PropTypes.number,
  type: PropTypes.string,
  text: PropTypes.string,
  labelClasses: PropTypes.string
};

export default NetworkGraph
