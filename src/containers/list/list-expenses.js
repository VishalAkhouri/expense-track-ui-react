import React from 'react';
import axios from '../../axios-mongod';
import {DateService} from "../../common/services/DateService";
// import {Button} from "../../common/components/styled/Button";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {ExpenseRow} from '../../components/expenseRow/expense-row';
import SimpleResultCard from '../../components/simpleResultCard/simple-result-card';
import AggregateResultCard from '../../components/aggregateResultCard/aggregate-result-card';

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
        return this.state.expenses.filter((expense) => expense.category !== 'static')
            .reduce(function (total, currentValue) {
                return total + currentValue.amount;
            } , 0);
    }

    getStaticExpensesAmount() {
        return this.state.expenses.filter((expense) => expense.category === 'static')
            .reduce(function (total, currentValue) {
                return total + currentValue.amount;
            } , 0);
    }

    getTotalExpenses() {
        return this.getDynamicExpensesAmount() + this.getStaticExpensesAmount();
    }

    getExpensesByCategories() {
        let categoryExpense = [];
        const categories = [...new Set(this.state.expenses.map(expense => expense.category))];

        categories.forEach((category) => {
            const total = this.state.expenses.filter((expense) => expense.category === category)
                .reduce(function (total, currentValue) {
                    return total + currentValue.amount;
                } , 0);

            categoryExpense.push({
                key: category,
                value: total
            });
        });

        return categoryExpense;
    }

    getExpensesByIndividuals() {
        let individualExpenses = [];
        const individuals = [...new Set(this.state.expenses.map(expense => expense.expenseBy))]; // use Set to remove duplicates

        individuals.forEach((individual) => {
            const total = this.state.expenses.filter((expense) => expense.expenseBy === individual)
                .reduce(function (total, currentValue) {
                    return total + currentValue.amount;
                } , 0);

            individualExpenses.push({
                key: individual,
                value: total
            });
        });

        return individualExpenses;
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Expenses summary</h1>
                </header>
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
                            <Button variant="contained" color="primary" onClick={this.fetchAggregatedData}>
                                Fetch data
                            </Button>
                        </div>
                    </form>
                </section>

                <Grid>
                    <ul>
                        <ExpenseRow expenses={this.state.expenses} />
                    </ul>
                </Grid>

                <SimpleResultCard title='Total expenses' content={this.getTotalExpenses()}></SimpleResultCard>
                <AggregateResultCard title='Aggregate who made the expense:' contents={this.getExpensesByIndividuals()}></AggregateResultCard>
                <SimpleResultCard title='Total static expenses' content={this.getStaticExpensesAmount()}></SimpleResultCard>
                <SimpleResultCard title='Total dynamic expenses' content={this.getDynamicExpensesAmount()}></SimpleResultCard>
                <AggregateResultCard title='Aggregate by category:' contents={this.getExpensesByCategories()}></AggregateResultCard>

            </div>
        );
    }
}