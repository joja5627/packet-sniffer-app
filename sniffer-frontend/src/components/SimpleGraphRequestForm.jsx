import React from 'react';
import Input from './Input';
import DropDown from './DropDown';
import { Provider, connect } from 'react-redux';
import { options, colors, graph_types } from '../fixtures';
import Column from './Column';
import Row from './Row';
import Button from './Button';
import * as httpAction from '../actions/restActions';
import defaultState from '../fixtures';
import * as actionTypes from '../actions/actionTypes';

/**
 * Renders a styled button to the page.
 * */

class SimpleGraphRequestForm extends React.Component {
  constructor(props) {
    super(props);

    (this.state = {
      class: null,
      dimensions: null,
      directed: false
    }),
      (this.classChangeHandler = this.classChangeHandler.bind(this));
    //   this.getGraph = this.getGraph.bind(this);
    this.dimensionsChangeHandler = this.dimensionsChangeHandler.bind(this);
  }
  getGraph() {
    this.props.simpleGraphRequest({
      dimensions: this.state.dimensions,
      class: this.state.class,
      directed: this.state.directed
    });
    this.setState({
        class: null,
        dimensions: null,
        directed: false
      });
  }
  dimensionsChangeHandler(event) {
    if (typeof event.value == 'string') {
      this.setState({ dimensions: event.value });
    }
  }
  classChangeHandler(event) {
    if (typeof event.value == 'string') {
      this.setState({ class: event.value });
    }
  }

  render() {
      console.log(this.state.dimensions)
    return (
      <Row>
        <Column extraClasses="col-4 padding-t-5 margin-l-5">
          <Input
            extraClasses="node-count-width 
            white-form-base label-text float-left"
            placeHolderClasses="default-placeholder"
            placeHolder="node count"
            name="dimensions"
            value={this.state.dimensions}
            type="text"
            onChange={this.dimensionsChangeHandler}
          />
          <br />
          <Button
                  extraClasses="
                    button-base
                    submit-button
                    point-on-hover
                    background-color-opacity-3 
                    graph-visualizer
                    color-white"
                  name="clear-graph"
                  type="button"
                  isDisabled={(this.state.class && this.state.dimensions) ? false:true }
                  toolTipText="clear graph"
                  clickHandler={this.getGraph.bind(this)}
                  >
                  submit
                  
                </Button>
          {/* <Button
            extraClasses={
              this.state.class && this.state.dimensions
                ? 'graph-controls-button shadow margin-t-20 btn-md width-80 border-bottom-none label-text white-form-base background-color-transparent margin-l-25'
                : 'graph-controls-button input-disabled shadow btn-md margin-t-20 label-text width-80 white-form-base border-bottom-none background-color-transparent margin-l-25'
            }
            name="dimensions"
            type="button"
            text="submit"
            clickHandler={this.getGraph.bind(this)}
          /> */}
        </Column>
        <Column extraClasses="scroll-y col-4">
          <DropDown
            extraClasses="float-left"
            placeHolderClasses="default-placeholder"
            options={graph_types}
            onChange={this.classChangeHandler}
            value={this.state.class}
            defaultPlaceholderValue="graph type"
          />
        </Column>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  switch (state.type) {
    case actionTypes.ADD_NODE:
      const { addNode } = state.graphReducer;
      return {
        ...state,
        addNode: addNode
      };
    default:
      return state;
  }
};
const mapDispatchToProps = dispatch => {
  return {
    simpleGraphRequest: state => dispatch(httpAction.simpleGraphRequest(state))
  };
};
//mapStateToProps,
export default connect(
  null,
  mapDispatchToProps
)(SimpleGraphRequestForm);
