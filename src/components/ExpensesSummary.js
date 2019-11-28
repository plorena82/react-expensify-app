import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => (

    <div>
        
            { 
                
                props.expensesCount === 0 ? (
                    <p>Total: 0</p>
                ): (
                    props.expensesCount === 1 ? (
                        <p>Viewing 1 expense totalling {numeral(props.totalExpenses/100).format('$0,0.00')}</p>
                    ): (
    
                        <p>Viewing {props.expensesCount} expenses totalling {numeral(props.totalExpenses/100).format('$0,0.00')}</p>
                    )

                )

            }
          
       
      
            </div>
 ); 



const mapStateToProps = (state) =>{
    const visibleExpenses=  selectExpenses(state.expenses,state.filters)
    return{
        expensesCount:visibleExpenses.length,
        totalExpenses: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary); 