import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


 export const ExpenseList = (props) => (

    <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>{/*show only Wxpenses in Mobile */}
                <div className="show-for-desktop">Expense</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className="list-body">
                {
                
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No expenses</span>
                    </div>
                ): (

                    props.expenses.map((expense)=> (
                        <ExpenseListItem 
                            key={expense.id}
                            {...expense}
                        />
                    ) )
                )
            
            }
            </div>            
    </div>
); 



 /* this code was inside div 
                 I implemented with props but it s better to use deconstruction 
                  props.expenses.map((expense)=> (
                <ExpenseListItem 
                    key={expense.id}
                    expense = {expense}
                />
            )


            )*/


//this HOC component function allows us to obtain from store the attributes
const mapStateToProps = (state) =>{
    return{
        expenses: selectExpenses(state.expenses,state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList); //we are indicating to connect using mapStateToProps to obtain the properties from store, and use ExpenseList as the result render component