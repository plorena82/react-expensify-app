import uuid from 'uuid';
import  database from '../firebase/firebase';

//we have multiple actions
/* 
we use Thunk because that allows use to use functions inside of our action generators.

Which in turn allows us to make asynchronous code for storing the stuff in firebase and upon success(resolve), dispatching the action to store that expense in our Redux store?

Also, because our promise was resolved, we now have access to reference of that expense and thus access to the firebase key/id and add store that as well in Redux
*/

//ADD_EXPENSE
export const addExpense = (expense) =>  ({
    type: 'ADD_EXPENSE',
    expense
});

//thunk function middleware to insert first in firebase db, then create the action addExpense to dispatch to the redux store
export const startAddExpense = (expenseData= {}) =>{

    return (dispatch)=> {
        const  {
            description='',
            note='', 
            amount=0, 
            createdAt= 0
        } = expenseData;
        
        const expense  = {description, note, amount, createdAt};
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key, 
                ...expense
            }));
          
        });
    };
};

// REMOVE_EXPENSE with this action we are creating the object passed to the reducer
export const removeExpense = ( {id} ={}  )  =>  ({
type: 'REMOVE_EXPENSE',
id
});


//EDIT_EXPENSE
export const editExpense = ( id, updates )  =>  ({
type: 'EDIT_EXPENSE',
id, 
updates    
});