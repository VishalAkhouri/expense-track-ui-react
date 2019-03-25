import React from 'react';
import axios from '../../axios';

export class ListExpenses extends React.Component {
    state = {
        expenses: []
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        axios.get(`/expenses.json`)
            .then(result => {
                let keys = Object.keys(result.data);
                let expenses = [];
                for (let i=0; i < keys.length ; i++) {
                    let k = keys[i];
                    expenses.push(result.data[k]);
                }
                this.setState({ expenses });
            });
    }

    render() {
        return (
            <div>
                Expenses::
                <ul>
                    { this.state.expenses.map((expense, i) => {
                        return (
                            <div>
                                <li key={i}>Dated: {expense.month} / {expense.year}</li>
                                <span>{expense.store}</span> |
                                <span>{expense.expense}</span> |
                                <span>{expense.category}</span> |
                                <span>{expense.expenseBy}</span>
                            </div>
                        )
                    })}
                </ul>
            </div>
        );
    }
}