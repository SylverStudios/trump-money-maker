import { createStore } from 'redux'
import trumpMM from './reducers'

let reduxStore = createStore(trumpMM);

export default reduxStore;