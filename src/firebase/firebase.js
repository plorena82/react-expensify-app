import * as firebase from 'firebase';
import moment from 'moment';

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  //Athentication provider
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  
  export {firebase, googleAuthProvider, database as default};


  /*
  
  database.ref().set({
      name:'Patricia Test',
      age: 37,
      stressLevel:6,
      job: {
          title: 'Software Dev',
          company:'Upwork'
      },
      isSingle: false,
      location:{
          city:'van',
          country:'Can'
      }
  }).then(()=>{ //promise to sync the insertion and wait to complete
    console.log('Data saved successfully');
  }).catch((e)=>{
    console.log('Save data failed:',e);
  });

database.ref().update({
    stressLevel:9,
    'job/company': 'Amazon', //to access nested attributes to update need to put the ' ' in the key too so firebase knows 
    'location/city': 'Ontario'
})).then(()=>{ //promise to sync the insertion and wait to complete
    console.log('Data saved successfully');
  }).catch((e)=>{
    console.log('Save data failed:',e);
  });

  database.ref('attributes').set({
      weight:65,
      height:178
  }  ).then(()=>{
      console.log('Attributes saved correctly.');
  }).catch((e)=>{
      console.log('error saving attrs: ', e)
  });


 database.ref().remove().then(()=>{
    console.log('removed ok');
  }).catch((e)=>{
    console.log('sth wrong, failed',e)
  });


  or use Set to remove 
  database.ref('isSingle').set(null);

  
//to get data from db only once, if data changes, this function is not called again, used for one call only
  database.ref().once('value')
                .then((snapshot) =>{
                    console.log(snapshot.val());
                })
                .catch((e) =>{
                console.log('error', e);
                });


                
  //instead of once, on will get the data everytime the data changes, to unsubcribe use off
const onValueChange = database.ref().on('value',(snapshot)=>{
    console.log(snapshot.val());
}, (e)=>{
    console.log('Error fetching data', e);
});

setTimeout(()=>{
    database.ref('age').set(35);
},4000);

setTimeout(()=>{
    database.ref().off(onValueChange); //unsubscribe getting data, is good to pass the function we want to unsubscribe of, as we may have multiple
},4000);


setTimeout(()=>{
    database.ref('age').set(50);
},4000);
  


//Excercise

  const onValueChangeChallenge = database.ref().on('value',(snapshot)=>{
      const values = snapshot.val();
      console.log(`${values.name}  is a  ${values.job.title}  at  ${values.job.company}`);
   // console.log(values.name + ' is a ' + values.job.title + ' at ' + values.job.company);
  },(e)=>{
    console.log('Error fetching data from firebase',e);
  });

  setTimeout(()=>{
    database.ref('job/company').set('Amazon');
  },6000);

 //push excercise

database.ref('expenses').push({
    description:'REnt',
    note:'rent of december',
    amount:1500,
    createdAt: 0
});


database.ref('expenses').push({
    description:'coffee',
    note:'at tims',
    amount:500,
    createdAt: 0
});


database.ref('expenses').push({
    description:'car rental',
    note:'for vacations',
    amount:7500,
    createdAt: 0
});


//subscribe on change of expenses list
database.ref('expenses').on('value',(snapshot)=>{
    const expenses = [];  
    snapshot.forEach((childExp)=>{
        expenses.push({
            id: childExp.key,
            ...childExp.val()
        });
    
    }  );
    console.log(expenses);

},(e)=>{
    console.log('Error fetching expenses', e);
});

 //subscribe on remove elemment from expense list
database.ref('expenses').on('child_removed',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
    
});


  //subscribe event on change any attribute of any element of the expense list
database.ref('expenses').on('child_changed',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
    
});

  //subscribe on add new expense elem in expense list (it is fired when added a new expense or for existing ones)
database.ref('expenses').on('child_added',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
    
});
  */