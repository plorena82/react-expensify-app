
const promise = new Promise((resolve,reject) =>{
    setTimeout(()=>{

        //resolve({name:'Andy', age:25});
        reject('Something wrong');
    },5000);

}); //generally we dont create the promise,they are created by the library using (in our case firebase)
//we only atttach handlers functions like then , catch

console.log('before');

promise.then((data)=>{

    console.log('data:' +data);
}).catch((error)=>{
    console.log('error: ' + error);
});

console.log('after');


//will print in browser console (reject scenario)
//before
//after
/////// after 5 seconds..... 

//error: Someting wrong