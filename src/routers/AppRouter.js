

import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory(); //adding the lib history allows us to create our history and have a global var to use in all the files not only in components
//with BrowserRouter it creates the history by default automatically and the history is only visible in components. thats why we change to Router with manual history var

const AppRouter=() => (
    <Router history={history}>
        <div>
            
            <Switch>
                <PublicRoute path='/' component={LoginPage} exact={true}/>
                
                <PrivateRoute path='/dashboard' component={ExpenseDashboardPage}/>
                <PrivateRoute path='/create' component={AddExpensePage}/>
                <PrivateRoute path='/edit/:id' component={EditExpensePage}/>
                <Route path='/help' component={HelpPage}/>
                <Route  component={NotFoundPage}/>
            </Switch>
        </div>     
    </Router>

);
 

export default AppRouter;