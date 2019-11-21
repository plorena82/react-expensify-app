import {createStore} from 'redux';

//DECONSTRUCTING OBJECTs
const incrementCount= ({incrementBy=1} = {}) => ({
    
  type:   'INCREMENT',
  //   const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy: 1;
    //no need to do the typeof check as in the params we are saying if incrementBy is undefined or does not exist or not passd as param, then set the incrementBy to 1. Also the {} empty is indicating the default is empty object is not passed as param, then the default value for incrementBy would be 1.
  incrementBy: incrementBy //same as put only incrementBy
});

const decrementCount= ({decrementBy=1} = {}) => ({
    type: 'DECREMENT',
  decrementBy  
});

const setCount = ({count }) =>({ //we dont put default values nor option to empty object as we want to force the user to set a value
    type:'SET',
    count
});

const resetCount = () => ({ type:'RESET'});

//This function is a reducer, it is a pure function, and never change the state and action parameters. 
const countReducer= (state = { count: 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
         //   const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy: 1;
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
          //  const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy: 1;
            return{
                count: state.count - action.decrementBy
            };
        case 'SET':
            return{
                count: action.count
            };
        case 'RESET':
            return{
                count: 0
            };
        default:
            return state;
    }
    
};


const store = createStore (countReducer);

//subscribe returns a function of unsubscribe, so if you call it then it will not show the changes in store
const unsubscribeStoreChanges = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({
    incrementBy: 5
}) );


store.dispatch(incrementCount());

// TO UNSUBSCRIBE call  unsubscribeStoreChanges();

store.dispatch(resetCount());

store.dispatch(decrementCount());


store.dispatch(decrementCount({
    decrementBy: 10
}) );



store.dispatch(setCount({
    count: 101
}) );