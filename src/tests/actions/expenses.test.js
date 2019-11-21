import {addExpense, removeExpense, editExpense} from '../../actions/expenses';

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

    const addExpenseData = {
        description:'Rent',
        amount:109500,
        createdAt: 1000,
        note:'This was the rent for last month'
    };
    const action = addExpense(addExpenseData);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense: {
            ...addExpenseData,
            id: expect.any(String)
        }
    });
});

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
});