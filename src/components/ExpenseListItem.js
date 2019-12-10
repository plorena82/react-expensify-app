
import React from 'react';
import { Link} from 'react-router-dom';
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

   
       
            <Link to={`/edit/${id}`} className="list-item">
                <div>
                 <h3 className="list-item__title"> {description}  </h3>
                 <span className="list-item__subtitle">  {moment(createdAt).format('MMMM Do, YYYY')}</span>
                </div>
                   
                <h3 className="list-item__data"> {numeral(amount/100).format('$0,0.00')} </h3>       
            </Link>
       
   
);

export default ExpenseListItem;