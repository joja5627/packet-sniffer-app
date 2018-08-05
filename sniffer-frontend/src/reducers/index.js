import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'
// import counter from './restReducer';
import graphReducer from './graphReducer';
import restReducer from './restReducer';


export default combineReducers({
//   todos,
//   visibilityFilter
restReducer,
graphReducer
})