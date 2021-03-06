import moment from 'moment';
import { setStartDate,setEndDate,setTextFilter,sortByAmount,sortByDate }from '../../actions/filters'

test('should set start date action object', ()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });

});

test('should set end date action object', ()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should set text filter action object with provided value', ()=>{
    const action = setTextFilter('value passed');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'value passed'
    });
});

test('should set text filter action object with no value', ()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text: '' 
    });
});

test('should set sortBy amount action object', ()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'
    
    });
});

test('should set sortBy date action object', ()=>{
    expect(sortByDate()).toEqual({ type:'SORT_BY_DATE'});
});