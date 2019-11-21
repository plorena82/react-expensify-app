
import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense} from '../actions/expenses.js';


export class  AddExpensePage extends React.Component{
    onSubmit= (expense)=>{

        //props.dispatch(addExpense(expense)); instead of doing dispatch here, we are doing in the mapDispatchToProps,, to have a clean onSubmit call for spy functions
        this.props.addExpense(expense); 
        this.props.history.push('/'); // redirects to home
    };

    render(){
        return(
            <div>
            <p>Add Expense</p>
            <ExpenseForm 
            onSubmit={this.onSubmit}
            />
        </div>
        );
    }
}
/* OLD stateless function approach.. using function, replaced by class 
const AddExpensePage = (props) => (
    <div>
        <p>Add Expense</p>
        <ExpenseForm 
        onSubmit= {(expense)=>{

            //props.dispatch(addExpense(expense)); instead of doing dispatch here, we are doing in the mapDispatchToProps,, to have a clean onSubmit call for spy functions
            props.onSubmit(expense); 
            props.history.push('/'); // redirects to home
        }}
        />
    </div>
);*/

//map the dispatch function to addExpense function attribute of a prop object
const mapDispatchToProps = (dispatch)=> ({
    
        addExpense: (expense)=> dispatch(addExpense(expense))
    
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);