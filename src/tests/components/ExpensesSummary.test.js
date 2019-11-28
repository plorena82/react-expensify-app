import React from 'react';
import { shallow } from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';


test('should render expense summary with total 0 , no elements', ()=>{
    const wrapper = shallow(<ExpensesSummary expenses={[]} totalExpenses={0}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should render expense summary with total 109.50 , 1 element', ()=>{
    const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]} totalExpenses={10950}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should render expense summary with total 156.45 , 3 elements', ()=>{
    const wrapper = shallow(<ExpensesSummary expenses={expenses} totalExpenses={15645}/>);
    expect(wrapper).toMatchSnapshot();
});