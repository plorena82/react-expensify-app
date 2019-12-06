
import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';
 
export const  LoginPage = (props)=> {
        return(
            <div>
            
         
                <button onClick={props.startLogin}>Sign in
                </button>
           

        </div>
        );
    }

const mapDispatchToProps = (dispatch) =>({
    startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage) ;