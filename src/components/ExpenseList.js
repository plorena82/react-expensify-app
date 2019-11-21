import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


 export const ExpenseList = (props) => (

    <div>
        
            {
                
                props.expenses.length === 0 ? (
                    <p>No expenses</p>
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