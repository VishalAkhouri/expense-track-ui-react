import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {CreateExpenses} from '../../containers/create/create-expenses';
import {ListExpenses} from '../../containers/list/list-expenses';

function Home() {
    return <h2>Home</h2>
}

// function CreateExpenses() {
//     return <h2>Create Expenses</h2>;
// }

// function ListExpenses() {
//     return <h2>List Expenses</h2>;
// }

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create expense</Link>
                        </li>
                        <li>
                            <Link to="/list">List expenses</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Route path="/" exact component={Home} />
            <Route path="/create" component={CreateExpenses} />
            <Route path="/list" component={ListExpenses} />

        </Router>
    )
}

export default AppRouter;