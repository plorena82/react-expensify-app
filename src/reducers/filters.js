import moment from 'moment';

//initialize startDate as the first day of current month, end as last day of current month
const defaultFilterReducerState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = defaultFilterReducerState, action) =>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {...state, text: action.text}; //if we create an object in the action function we could use return {...state, action.objectName} to obtain the same result. That was my first approach when doing the excercise
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount'};
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date'};
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate};
        case 'SET_END_DATE':
            return {...state, endDate: action.endDate};
        default:
            return state;
    }
};

