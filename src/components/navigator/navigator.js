import React from 'react';
import './navigator.scss';

export class Navigator extends React.Component {
    render() {
        return <nav>
            <a href='/create'>Create Expenses</a>
            <a href='/list'>List Expenses</a>
        </nav>;
    }
}