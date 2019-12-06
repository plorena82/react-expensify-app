import {firebase, googleAuthProvider} from '../firebase/firebase';


export const login = (uid) =>({
    type:'LOGIN',
    uid
});


//action to open the Google account pop up to sign in
export const startLogin = (()=>{
    return() =>{
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
});


export const logout = () =>({
    type:'LOGOUT'
});

//action to open the Google account pop up to sign out
export const startLogout = (()=>{
    return() =>{
        return firebase.auth().signOut();
    };
});
