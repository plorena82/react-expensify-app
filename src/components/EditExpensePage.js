

import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense,removeExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component{

    onSubmitEdit= (expense)=>{
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/'); // redirects to home 
    };

    onClickRemove = ()=>{
        this.props.removeExpense({id:this.props.expense.id});
        this.props.history.push('/'); 
    };

    render(){
        return (
            <div>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmitEdit}  
                />
                <button onClick={this.onClickRemove}>
                    Remove
                </button>  
            </div>
        );
    };
}
//props.match is an object inside tthe Router which contains the parameters of the URL, inside params, we have our id
/*const EditExpensePage = (props) => {
    
    return (
        <div>
            <ExpenseForm 
                expense={props.expense}
                onSubmit={(expense) =>{
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/'); // redirects to home    
                }}  
            />
            <button onClick={()=>{
                props.dispatch(removeExpense({id : props.expense.id } ));
                props.history.push('/'); 
            }}>
                Remove
            </button>  
        </div>
    );
}*/

const mapStateToProperties = (state,props)=>{
    return {
        expense: state.expenses.find((expense) => {
            return expense.id == props.match.params.id;
        } )
    };
}
const mapDispatchToProps = (dispatch,props)=>({
    
        editExpense: (id,expense)=> dispatch(editExpense(id, expense)), 
        removeExpense:  (data)=> dispatch(removeExpense(data))
    
});

export default connect(mapStateToProperties,mapDispatchToProps)(EditExpensePage);