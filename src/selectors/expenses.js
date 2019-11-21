
import moment from 'moment';
//timestamps miliseconds since January 1st 1970  (unix epoch)

export default (expenses, {text, sortBy, startDate, endDate}) =>{
    return expenses.filter( (expense)=>{ 
            const createAtMoment = moment(expense.createdAt);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day'):true; //true means no filtering
            const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment):true;
            //old approach //filter (returns the expenses where the startDate/end date not a number and the expenses whose createdAt date is between startdate and endDAte. IF undefined, it s like we dont have a filter )
                //  const startDateMatch = typeof startDate != 'number' || expense.createdAt >= startDate ;
            // const endDateMatch = typeof endDate != 'number' || expense.createdAt <= endDate ;
                ///
                const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

                return  startDateMatch && endDateMatch && textMatch;
    }).sort((expA, expB)=>{
        if(sortBy == 'date'){ //we want to show the recents date first a <b put b first =1, -1 a is greater than b then put a first return -1
         return expA.createdAt <  expB.createdAt ? 1:-1 ;
        }
        else if(sortBy == 'amount'){//big amounts first
            return expA.amount < expB.amount? 1: -1;
        }

    });

};