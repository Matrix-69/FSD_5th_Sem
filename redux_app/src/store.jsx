import {createStore} from 'redux';
import reduxer from './reducer';
const store = createStore(reduxer);
export default store;