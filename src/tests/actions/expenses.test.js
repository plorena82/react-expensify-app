import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense,startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database  from '../../firebase/firebase';
import moment from 'moment';

const createMockStore = configureMockStore([thunk]);

const uid='thisismyuidfortest';
const defaultAuthState = {auth:{uid}};



beforeEach((done)=>{
    const expensesData={};
    expenses.forEach(({id, description, note, createdAt, amount})=>{
        expensesData[id] = {description, note, createdAt, amount};

    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(()=>{done();});
});


test('Test should setup the remove Expense object ',()=>{
    const action = removeExpense({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc'
    });

});

test('test should setup an edit Expense action object', () =>{
    const action = editExpense('123abc', {amount:200, note:'new value'} ); 
    expect(action).toEqual({
        type: 'EDIT_EXPENSE', 
        id:'123abc',
        updates:{
             amount:200,
             note:'new value'
                       }
    });
});

test('test should set up an add expense object with provided values',()=>{

   const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: expenses[2]
    });
});


//THIS IS AN ASYNC test, need to inform Jest about this using done()
test('should add expense in firebase db and store ',(done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseData= {
        description:'Mouse',
        amount:3500,
        createdAt: 1000,
        note:'for the PC, optical'
    };
    
    store.dispatch(startAddExpense(expenseData)).then(() =>{
       //validating store action 
       const actions = store.getActions();
       expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
       });
       // validate in the next "then" the firebase database,  whether the expense was successfully added
        database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot)=>{   //now validating firebase database 
             expect(snapshot).toEqual(expenseData);
      
         });
         done();
    });
});


//THIS IS AN ASYNC test, need to inform Jest about this using done()
test('should add expense with DEFAULTS in firebase db and store ',(done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseDefault= {
        description:'',
        amount:0,
        createdAt: 0,
        note:''
    };
    
    store.dispatch(startAddExpense({})).then(() =>{
       //validating store action 
       const actions = store.getActions();
       expect(actions[0]).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDefault
        }
       });
       // validate in the next "then" the firebase database,  whether the expense was successfully added
        database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot)=>{   //now validating firebase database 
             expect(snapshot).toEqual(expenseDefault);
      
         });
         done();
    });
});


test('test should set expenses action object with provided values',()=>{

    const action = setExpenses(expenses);
     expect(action).toEqual({
         type:'SET_EXPENSES',
         expenses
     });
 });
 
 test('should retrieve expenses from firebase and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
         type:'SET_EXPENSES',
         expenses
        });
        done();
    });
 });

 test('should remove expenses from firebase and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveExpense({id:3})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type:'REMOVE_EXPENSE',
            id:3
           });
           database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value').then((snapshot)=>{   //now validating firebase database 
            expect(snapshot.val()).toBeFalsy();
            done();
        });
       
    });
 });

 test('should edit expense from firebae and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates= {description:'truck needed for construction, amount:35000'};
    store.dispatch(startEditExpense(id, updates )).then(()=>{
        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type:'EDIT_EXPENSE',
            id,
            updates
        });   
        database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot)=>{
            expect(snapshot.val().description).toBe('truck buy for construction');
            expect(snapshot.val().amount).toBe(35000);
            done();
         });
           
    });
 });
/*
test('test should set up an add expense object with empty values',()=>{

    const defaultExpenseData = {
        description:'',
        amount:0,
        createdAt: 0,
        note:''
    };
    const action = addExpense({});
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            ...defaultExpenseData,
            id: expect.any(String)
        }
    });
});*/