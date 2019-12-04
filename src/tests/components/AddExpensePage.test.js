import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';


let onSubmitSpy,addExpenseSpy, historySpy, wrapper;
//pass a function as a parameter of beforeEach, so this function will be called before each test case.
beforeEach(()=>{

     addExpenseSpy = jest.fn();
     historySpy = {push: jest.fn()};
     wrapper = shallow(<AddExpensePage startAddExpense={addExpenseSpy} history={historySpy}/>);
    
});

test('should render AddExpensePage correctly',()=>{
   expect(wrapper).toMatchSnapshot();
});

test('should render AddExpensePage correctly',()=>{
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});