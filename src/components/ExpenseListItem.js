
import React from 'react';
import { NavLink} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

/* I implemented with props but it s better to use deconstruction
const ExpenseListItem = (props) => (

    <div>
        <p>{props.expense.description} { " " } {props.expense.amount} { " " } {props.expense.createdAt}    </p>         
        <button onClick={(id)=>{

            props.dispatch(removeExpense(id));
        }
        }>
            Remove
        </button> 
    </div>
);
*/

export const ExpenseListItem = ({id, description, amount, createdAt, dispatch}) => (

    <div>
        <h3><NavLink to={`/edit/${id}`}   activeClassName="is-active"> {description} </NavLink></h3>
        <p>
        { " " } 
        {numeral(amount/100).format('$0,0.00')} 
        -
        {moment(createdAt).format('MMMM Do, YYYY')}    </p>      
    </div>
);

export default ExpenseListItem;