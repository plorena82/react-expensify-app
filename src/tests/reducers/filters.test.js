import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should set up default filter state', ()=>{
    const state = filterReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });

});


test('should set up sort by amount filter', () =>{

    const state = filterReducer(undefined, {type:'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount');
});

test('should set up sort by date filter ', () =>{
    const currentState = {text:'', startDate:undefined, endDate:undefined, sortBy:'amount'};
    const action = {type:'SORT_BY_DATE'};
    const state = filterReducer(currentState, action );
    expect(state.sortBy).toBe('date');
});

test('should set up  text filter', () =>{
    const action = {type: 'SET_TEXT_FILTER', text:'rent'};
    const state = filterReducer(undefined,action);
    expect(state.text).toBe('rent');
});

test('should set up startDate filter', () =>{
    const startDt=  moment().startOf('month');
    const state = filterReducer(undefined, {type:'SET_START_DATE', startDate:startDt})
    expect(state.startDate).toBe(startDt);
});

test('should set up endDate filter', () =>{
    const endDt = moment().endOf('month');
    const state = filterReducer(undefined, {type:'SET_END_DATE', endDate:endDt})
    expect(state.endDate).toBe(endDt);
});