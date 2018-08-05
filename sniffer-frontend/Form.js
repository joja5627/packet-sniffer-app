import React from 'react';
import {
  Field,
  reduxForm
} from 'redux-form';
import {
  Button,
  Input
} from 'semantic-ui-react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  NodeForm
} from './NodeForm'
import _ from 'lodash';

const ButtonWrapper = styled.div `
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
`

const FieldWrapper = ButtonWrapper.extend `
  display: flex;
  flex-direction: column;
`

const renderField = ({
  input,
  label,
  type,
  meta: {
    touched,
    error
  }
}) => ( <
  FieldWrapper >
  <
  Input label = {
    label
  } { ...input
  }
  type = {
    type
  }
  error = {
    touched && error
  }
  focus placeholder = {
    label
  }
  /> < /
  FieldWrapper >
);

// function getArrays(object){
//   return Object.keys(object).map(function(key){
//         return [key, object[key]];
//     });
// }


let Form = (props) => {

  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    initialValues
  } = props;
  // console.log(props)
  //   let tasks = this.props.tasks.map((task) => ( <li className="checklist__task">
  //       <input type="checkbox" defaultChecked={task.done} /> {task.name}
  //   <a href="#" className="checklist__task--remove" />
  // </li> ));

  console.log(initialValues['color'])

  return ( <
    form onSubmit = {
      handleSubmit
    } >
    <
    FieldWrapper > {
      //    <form onSubmit={this.handleSubmit}>
      //    <label>
      //      Name:
      //      <input type="text" value={this.state.value} onChange={this.handleChange} />
      //    </label>
      //    <input type="submit" value="Submit" />
      //  </form>
      // initialValues && 
      // Object.keys(initialValues).map((attribute, index) =>



      //     <Field
      //       key={index}
      //       name={attribute}
      //       type="text"
      //       component={renderField}
      //       label={attribute}
      //     /> )
    } <
    /FieldWrapper> <
    ButtonWrapper >
    <
    Button type = "submit"
    disabled = {
      submitting
    } > Submit < /Button> <
    Button type = "button"
    disabled = {
      pristine || submitting
    }
    onClick = {
      reset
    } >
    Clear Values <
    /Button> < /
    ButtonWrapper > <
    /form>
  );

}





Form = reduxForm({
  form: 'Form', // a unique identifier for this form
  enableReinitialize: true,
})(Form);

Form = connect()(Form)

export default Form