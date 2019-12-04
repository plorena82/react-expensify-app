import expenses from '../fixtures/expenses';
import expenseReducer from '../../reducers/expenses';

test('should set default state',() =>{
    const state = expenseReducer(undefined,{type:'@@INIT'});
    expect(state).toEqual([]);
});



test('should remove expense',() =>{
    const state = expenseReducer(expenses, {type:'REMOVE_EXPENSE', id:expenses[1].id});
    expect(state).toEqual([expenses[0], expenses[2]]);
});



test('should not remove expense if id not found',() =>{
    const action =  {type:'REMOVE_EXPENSE', id:'-1'};
       const state = expenseReducer(expenses,action);
        expect(state).toEqual(expenses);
   
});



test('should add expense',() =>{
    const expense = {
        id:'4',
        description:'some coffee',
        amount:9870,
        note:'',
        createdAt:0
    };
    const state = expenseReducer(expenses, {type:'ADD_EXPENSE',expense});
    expect(state).toEqual([...expenses ,  expense]);
});


test('should edit expense',() =>{
    const state = expenseReducer(expenses, {type:'EDIT_EXPENSE', id:expenses[1].id, updates:{description:'house'}});
    expect(state[1].description).toBe('house');
});



test('should not edit expense if id not found',() =>{
    const state = expenseReducer(expenses, {type:'EDIT_EXPENSE', id:'-1',updates:{description:'test'}});
    expect(state).toEqual(expenses);
});

test('should set expenses in Reducer',()=>{
    const action =  {type:'SET_EXPENSES', expenses};
    const state = expenseReducer(expenses,action);
     expect(state).toEqual(expenses);

})