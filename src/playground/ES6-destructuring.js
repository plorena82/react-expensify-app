
//OBJECT DESTRUCTURING
//////////////////////////


console.log('DESTRUCTURING');

const person = {
    name: 'PAt',
    age: 37,
    location:{
        city: 'VAN',
        temp: 15
    }
};

const {name :firstName ='Anonymus', age} = person; //in name I ve put a default value, case in the object person the attr does not exist

//console.log(`${firstName} is ${age} years old`);

const {city, temp:temperature} = person.location

//console.log(`She lives in ${city} and the temperature is ${temperature}`);


const book ={
    title:'Ego is the enemy',
    author:'Ryan Holiday',
    publisher:{
        name:'Penguin'
    }
};

const {name: publisherName = 'Self-published'} = book.publisher;

//console.log(publisherName);

//////////////////////////////////////////////////////////////////////////////

//ARRAY DESTRUCTURING


const address = ['Quebec ST', 'VAN', 'BC', 'V5X'];

const [,cityA,state= 'Alberta'] = address;

//console.log(`You are in ${cityA} ${state}`)


const item = ['Coffe (hot)','$2','$2.5','$2.75'];

const [desc,,med] = item;

console.log(`A medium ${desc} costs ${med}`);