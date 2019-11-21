//Higher order components (HOC) It is a component (hoc)  that renders another component
//advantages
//reuse code
//render hijacking
//props manipulation
//abstract state

import React from 'react';
import ReactDOM from 'react-dom';


const Info = (props) =>(
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
);

const withAdminWarningFunction = (WrappedComponent) => {
    return (props) =>(
        <div>
            { props.isAdmin && <p>This is private info, Please dont share!</p>}
            <WrappedComponent {...props} />
        </div>
    );

};

const requiresAuthentication = (WrappedComponent) => {
    return (props) =>(
        <div>
            {props.isAuthenticated?  <WrappedComponent {...props} /> : 'Authentication failed'}
        </div>
    );

}

const AdminInfoComponent = withAdminWarningFunction(Info);

const AuthenticationInfoComponent = requiresAuthentication(Info);

//ReactDOM.render(<AdminInfoComponent isAdmin={true} info="these are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthenticationInfoComponent isAuthenticated={true} info="these are the details"/>, document.getElementById('app'));