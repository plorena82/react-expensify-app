import {createStore} from 'redux';

const store = createStore ( (state = { count: 0}, action) => {
    switch(action.type){
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy: 1;
            return{
                count: state.count + incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy: 1;
            return{
                count: state.count - decrementBy
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
    
});


//subscribe returns a function of unsubscribe, so if you call it then it will not show the changes in store
const unsubscribeStoreChanges = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({
    type : 'INCREMENT'
});
store.dispatch({
    type : 'INCREMENT',
    incrementBy: 5
});

// TO UNSUBSCRIBE call  unsubscribeStoreChanges();

store.dispatch({
    type : 'RESET'
});

store.dispatch({
    type : 'DECREMENT'
});


store.dispatch({
    type : 'DECREMENT',
    decrementBy: 10
});



store.dispatch({
    type : 'SET',
    count: 101
});