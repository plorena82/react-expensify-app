import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';

import {ExpenseListFilters}from '../../components/ExpenseListFilters';
import {filters,altFilters} from '../fixtures/filters';

let wrapper, setTextSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy;
beforeEach(()=>{
    setTextSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextSpy}
        sortByDate={sortByDateSpy}
        sortByAmount={sortByAmountSpy}
        setStartDate={setStartDateSpy}
        setEndDate={setEndDateSpy}

    />);

});

test('should render ExpenseListFilters correctly with default filters',()=>{
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseListFilters correctly with altFilters',()=>{
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});


test('should handle filter text change',()=>{
    const value = 'rent';
    wrapper.find('input').simulate('change',
        {
           target:{ value} 
        });
     expect(setTextSpy).toHaveBeenLastCalledWith(value);
});

test('should handle sort by date filter',()=>{
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });

    wrapper.find('select').simulate('change',
        {
           target:{value: value} 
        });
      expect(sortByDateSpy).toHaveBeenCalled();
    
});

test('should handle sort by amount filter',()=>{
    const value = 'amount';
    wrapper.find('select').simulate('change',
        {
           target:{value: value} 
        });
        expect(sortByAmountSpy).toHaveBeenCalled();
});

test('should handle filter date changes ',()=>{
   const startDate = moment(0).add(4, 'years');
   const endDate = moment(0).add(8, 'years');
   wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
   expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
   expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes',()=>{
    const focused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});