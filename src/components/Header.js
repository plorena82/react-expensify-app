
import React from 'react';
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => {
    return (
    <header>
        <h1>Expensify</h1>
        <h3><NavLink to="/" activeClassName="is-active"  exact={true}> Go home</NavLink></h3>
        <h3><NavLink to="/create" activeClassName="is-active"> Create Expense</NavLink></h3>
        <h3><NavLink to="/help" activeClassName="is-active"> Help</NavLink></h3>
        <button onClick= {props.startLogout}>Logout</button>
    </header>);
    };

    
const mapDispatchToProps = (dispatch) =>({
    startLogout: () => dispatch(startLogout())
});


export default connect(null, mapDispatchToProps)(Header);