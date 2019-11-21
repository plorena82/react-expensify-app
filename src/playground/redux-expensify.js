import {createStore, combineReducers, bindActionCreators} from 'redux';
import uuid from 'uuid';
//we have multiple actions, so we would need more than one reducer
//ADD_EXPENSE

const addExpense = ( {
        description='',
        note='', 
        amount=0, 
        createdAt= 0
    } = {} 
    ) =>  ({
    type: 'ADD_EXPENSE',
    expense:{ 
        id : uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE with this action we are creating the object passed to the reducer
const removeExpense = ( id   )  =>  ({
    type: 'REMOVE_EXPENSE',
    id
});


//EDIT_EXPENSE
const editExpense = ( id, updates )  =>  ({
    type: 'EDIT_EXPENSE',
    id, 
    updates    
});


//
//SET_TEXT_FILTER
const setTextFilter = (text ='' ) => ({
    type:'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT
const sortByAmount = ()=> ({
    type:'SORT_BY_AMOUNT'
});

//SORT_BY_DATE
const sortByDate = () => ({
    type:'SORT_BY_DATE'
});

//SET_START_DATE
const setStartDate = (startDate) => ({
    type:'SET_START_DATE',
    startDate
});
//SET_END_DATE
const setEndDate = (endDate) => ({
    type:'SET_END_DATE',
    endDate
});

// Creating 2 reducers 1 for expenses, 1 for filters

const defaultExpenseReducerState = [];

const expenseReducer = (state = defaultExpenseReducerState, action) =>{
    switch(action.type){
        case 'ADD_EXPENSE': 
            // we can use this return state.concat(action.expense); OR 
            return [ ...state, action.expense]; //this is called ES spread operator, which doesnot change the original state array, we are returning the state array plus the new expense
        case 'REMOVE_EXPENSE': //we are using filter function of array which does not change the original state array, it returns a subarray based on condition
             return state.filter(  item =>  item.id != action.id );
             //this also can be done destructuring the item of state array
             // return state.filter( ( {id} ) =>  id != action.expense.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id == action.id){
                    return{
                       ...expense,
                       ...action.updates 
                    };
                }
                else{
                    console.log(action.id);
                    return expense;
                }
            });
        default:
            return state;
    }
};

const defaultFilterReducerState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate:undefined
};

const filterReducer = (state = defaultFilterReducerState, action) =>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text}; //if we create an object in the action function we could use return {...state, action.objectName} to obtain the same result. That was my first approach when doing the excercise
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date'};
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};
        default:
            return state;
    }
};

//create the store
const store = createStore(
    combineReducers({
        expenses : expenseReducer,
        filters: filterReducer
    } )
);

//timestamps miliseconds since January 1st 1970  (unix epoch)

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) =>{
    return expenses.filter( (expense)=>{ //filter (returns the expenses where the startDate/end date not a number and the expenses whose createdAt date is between startdate and endDAte. IF undefined, it s like we dont have a filter )
        const startDateMatch = typeof startDate != 'number' || expense.createdAt >= startDate ;
        const endDateMatch = typeof endDate != 'number' || expense.createdAt <= endDate ;
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return  startDateMatch && endDateMatch && textMatch;
    }).sort((expA, expB)=>{
        if(sortBy == 'date'){ //we want to show the recents date first a <b put b first =1, -1 a is greater than b then put a first return -1
         return expA.createdAt <  expB.createdAt ? 1:-1 ;
        }
        else if(sortBy == 'amount'){//big amounts first
            return expA.amount < expB.amount? 1: -1;
        }

    });

};

//just subscrbe to see changes
store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log( visibleExpenses);
   }
);


//dispatching action addExpense
const expenseOne = store.dispatch(addExpense({description: 'Rent', amount:1000, note:'Pay until day 5', createdAt:-2000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount:500, note:'Break at work', createdAt:-1000}));
/*
store.dispatch( removeExpense( expenseOne.expense.id ) );

store.dispatch( editExpense( expenseTwo.expense.id,{ amount:200} ) );

store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());



 store.dispatch(setTextFilter('ffe'));
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(999));
store.dispatch(setStartDate());
  */
 store.dispatch(sortByDate());
 

store.dispatch(sortByAmount());

const demoState = {
    expenses:[{
        id:'djfdlkjfska',
        description:'January Rent',
        note:'This was the final payment for that address',
        amount:54500, //in pennies
        createdAt: 0
    }],
    filters:{
        text: 'rent', //allows the user to search by any text, for ex rent
        sortBy:'amount', //expenses result can be shown by date or amount
        startDate: undefined, //filter
        endDate:undefined //filter used to search expenses between startDate and endDate 
    }
};


/* example of Object spread operator
const user = {
    name:'PAt',
    age:37
};

console.log({
    age:27,
     ...user,
    
    location:'Buenos Aires'
}); */