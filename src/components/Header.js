
import React from 'react';
import { NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <h3><NavLink to="/" activeClassName="is-active"  exact={true}> Go home</NavLink></h3>
        <h3><NavLink to="/create" activeClassName="is-active"> Create Expense</NavLink></h3>
        <h3><NavLink to="/help" activeClassName="is-active"> Help</NavLink></h3>
    </header>
);

export default Header;