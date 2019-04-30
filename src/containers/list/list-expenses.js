import React from 'react';
// import axios from '../../axios';
import axios from '../../axios-mongod';
import {DateService} from "../../common/services/DateService";

export class ListExpenses extends React.Component {
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    years = ['2019', '2020', '2021'];
    state = {
        month: DateService.getCurrentMonth(),
        year: DateService.getCurrentYear(),
        expenses: [],
        amount: {
            staticExpense: '',
            dynamicExpenses: ''
        }
    };

    constructor(props) {
        super(props)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fetchAggregatedData = (event) => {
        axios.get(`/expense/${this.state.month}/${this.state.year}`)
            .then(result => {
                let keys = Object.keys(result.data);
                let expenses = [];
                for (let i=0; i < keys.length ; i++) {
                    let k = keys[i];
                    expenses.push(result.data[k]);
                }
                this.setState({ expenses });
            });
    };

    componentDidMount() {
        // TODO uncomment for firebase connect
        // axios.get(`/expenses.json`)
        console.log("props params: ", this.props.match.params);

        axios.get(`/expense/${DateService.getCurrentMonth()}/${DateService.getCurrentYear()}`)
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

    getDynamicExpensesAmount() {
        const dynamicExpense = this.state.expenses.filter((expense) => expense.category !== 'static')
            .reduce((total, currentValue) => total + currentValue, 0);

        console.log('total dynamic expenses: ', this.state.expenses, dynamicExpense);
    }

    getStaticExpensesAmount() {

    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.expenses.map((expense, i) => {
                        return (
                            <div>
                                <li key={i}>{expense.transactionDate} |&nbsp;
                                <span>{expense.storeName}</span> |&nbsp;
                                <span> {expense.description}</span> |&nbsp;
                                <span> AUD {expense.amount}</span> |&nbsp;
                                <span> {expense.category}</span> |&nbsp;
                                <span> {expense.expenseBy}</span>
                                </li>
                            </div>
                        )
                    })}
                </ul>

                <br />

                <section>
                    <form>
                        <div>Get expenses for the month and year:</div>

                        <label htmlFor='month'>
                            <span>Choose month</span>
                            <select id='month' name='month' value={this.state.month} onChange={this.handleChange}>
                                {
                                    this.months.map((month, i) => {
                                        return <option key={i} value={month}>{month}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='year'>
                            <span>Choose year</span>
                            <select id='year' name='year' value={this.state.year} onChange={this.handleChange}>
                                {
                                    this.years.map((year, i) => {
                                        return <option key={i} value={year}>{year}</option>
                                    })
                                }
                            </select>
                        </label>

                        <div>
                            <input type='button' value='Fetch' onClick={this.fetchAggregatedData}/>
                        </div>
                    </form>
                </section>
                <div>
                    <span>total static expenses: </span>
                    <span>{this.getDynamicExpensesAmount()}</span>
                </div>
            </div>
        );
    }
}