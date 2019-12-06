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

    return (dispatch,getState)=> {
        const  {
            description='',
            note='', 
            amount=0, 
            createdAt= 0
        } = expenseData;
        const uid = getState().auth.uid;
        const expense  = {description, note, amount, createdAt};
        return database.ref(`users/${uid}/expenses`).push(expense).then((snap) => {
            dispatch(addExpense({
                id: snap.key, 
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

export const startRemoveExpense = ({id} ={}) =>{
    return (dispatch,getState) =>{//I could have use database.ref(`users/${uid}/expenses/${id}`).remove

         const uid= getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).set(null).then(()=>{
            dispatch(removeExpense({id}));
        });
    };
};


//EDIT_EXPENSE
export const editExpense = ( id, updates )  =>  ({
type: 'EDIT_EXPENSE',
id, 
updates    
});

export const startEditExpense = (id, updates)=>{
    return (dispatch,getState) =>{
        const uid= getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).set(updates).then(()=>{
            dispatch(editExpense(id, updates));
        });
    };
};

//SET_EXPENSES for setting into the store
export const setExpenses = (expenses) =>( {
    type:'SET_EXPENSES',
    expenses
});

// action use to fetch the expenses from firebase and performs dispatch of the SetExpenses action obj
export const startSetExpenses = () => {
     return (dispatch,getState) =>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot)=>{
            const expenses =[];
            snapshot.forEach((childSnap)=>{
                expenses.push({
                    id: childSnap.key,
                    ...childSnap.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
     }   

};