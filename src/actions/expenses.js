import uuid from 'uuid';

//we have multiple actions, so we would need more than one reducer
//ADD_EXPENSE

export const addExpense = ( {
    description='',
    note='', 
    amount=0, 
    createdAt= 0
} = {} 
) =>  ({
type: 'ADD_EXPENSE',
expense:{ 
    id : uuid(),
    description,
    note,
    amount,
    createdAt
}
});

// REMOVE_EXPENSE with this action we are creating the object passed to the reducer
export const removeExpense = ( {id} ={}  )  =>  ({
type: 'REMOVE_EXPENSE',
id
});


//EDIT_EXPENSE
export const editExpense = ( id, updates )  =>  ({
type: 'EDIT_EXPENSE',
id, 
updates    
});