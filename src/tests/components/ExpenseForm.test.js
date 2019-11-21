import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

 //for these tests we had to mock the moment library as the moment() for createdAt was diferent in snapshot, 
    //and it depended on when we run the tests. so in the mock we put moment(0) as fixed value in default, only for tests ok?
   
test('should render the expense form component for new expense',() =>{
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot();
});


test('should render the expense form component for edit',() =>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>); 
     expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission',() =>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    });
    expect(wrapper.state('errorMessage').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
    
});

test('should set description on input change, onDescriptionChange',() =>{
    const wrapper = shallow(<ExpenseForm/>);
    const value = 'text test';
    wrapper.find('input').at(0).simulate('change',
            {
               target:{value: value} 
            });
    expect(wrapper.state('description')).toBe(value);
});


test('should set note on textArea change, onNoteChange',() =>{
    const wrapper = shallow(<ExpenseForm/>);
    const value = 'new note value';
    wrapper.find('textarea').simulate('change',
            {
               target:{ value} 
            });
    expect(wrapper.state('note')).toBe(value);
});


test('should set amount with valid input , onAmountChange',() =>{
    const wrapper = shallow(<ExpenseForm/>);
    const value = '23.50';
    wrapper.find('input').at(1).simulate('change',
            {
               target:{value: value} 
            });
    expect(wrapper.state('amount')).toBe(value);
});



test('should set amount with valid input , onAmountChange',() =>{
    const wrapper = shallow(<ExpenseForm/>);
    const value = '23.122';
    wrapper.find('input').at(1).simulate('change',
            {
               target:{value: value} 
            });
    expect(wrapper.state('amount')).toBe('');
});


/***
 * SPY FUNCTIONS OR MOCK FUNCTIONS
 * Mock functions are also known as "spies", because they let you spy on the behavior of a function that is
 * called indirectly by some other code, rather than only testing the output.
 *  You can create a mock function with jest.fn().
 *  If no implementation is given, the mock function will return undefined when invoked.
 * 
 * 
 */

test('should call onSubmit prop for valid form submission',()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault: () => {}
    });
   expect(wrapper.state('errorMessage')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    }    );
});

test('should test a date on createdAt date change,  onDateChange',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const now= moment();
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should test calendar focus on  change,  onDateChange',()=>{
    const wrapper = shallow(<ExpenseForm />);
    const focused = true;
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});