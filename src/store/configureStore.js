import {createStore, combineReducers} from 'redux';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters'

//create the store, notice the window.__REDUX_DEVTOOLS_EXTENSION added to support the chrome plugin to see the actions, slider to see actions through time, state, etc
export default () =>{
const store = createStore(
        combineReducers({
            expenses : expenseReducer,
            filters: filterReducer
        } ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};