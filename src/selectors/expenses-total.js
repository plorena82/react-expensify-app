

export default (expenses) =>{
      
    return expenses
     .map((expense)=>{
                return expense.amount;
        })
    .reduce((total, num)=>{
        return total + num;
    },0);
};