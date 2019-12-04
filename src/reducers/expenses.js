
const defaultExpenseReducerState = [];

export default (state = defaultExpenseReducerState, action) =>{
   
    switch(action.type){
        case 'ADD_EXPENSE': 
            // we can use this return state.concat(action.expense); OR 
            return [ ...state, action.expense]; //this is called ES spread operator, which doesnot change the original state array, we are returning the state array plus the new expense
        case 'REMOVE_EXPENSE': //we are using filter function of array which does not change the original state array, it returns a subarray based on condition
            return state.filter( ({id})=> id != action.id );
             //this also can be done destructuring the item of state array
             // return state.filter( ( {id} ) =>  id != action.expense.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id == action.id){
                    return{
                       ...expense,
                       ...action.updates 
                    };
                }
                else{
                    console.log(action.id);
                    return expense;
                }
            });
        case 'SET_EXPENSES'://no matter the previous status, we return the expenses in action
            return action.expenses;
        default:
            return state;
    }
};