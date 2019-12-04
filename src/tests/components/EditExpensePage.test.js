import React from 'react';
import {shallow} from 'enzyme';

import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let removeExpenseSpy, editExpenseSpy,history, wrapper;

beforeEach(() => {
    removeExpenseSpy= jest.fn();
    editExpenseSpy = jest.fn();
    history = {push:jest.fn()};
     wrapper = shallow(<EditExpensePage 
        editExpense={editExpenseSpy}
        startRemoveExpense={removeExpenseSpy}
          history={history}
          expense={expenses[1]} />);

});

test('should render EditExpensePage correctly',()=>{
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense onSubmit ',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);

});


test('should handle removeExpense onClick  ',()=>{
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id:expenses[1].id});


});