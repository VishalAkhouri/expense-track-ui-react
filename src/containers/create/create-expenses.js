import React from 'react';
import './create-expenses.scss';

// import firebase from '../../firebase';
// import axios from '../../axios';
import axios from '../../axios-mongod';
import moment from 'moment';
import {DateService} from "../../common/services/DateService";
import {Button} from '../../common/components/styled/Button';

export class CreateExpenses extends React.Component {

    expenseCategories = ['eatingOut', 'groceries', 'clothes', 'travel', 'mobile', 'entertainment', 'petrol', 'otherMiscellaneous', 'utilities', 'cash', 'homeLoanExtraContrib', 'cheapFareMart', 'static'];
    accountDebited = ['ANZ', 'NAB', 'GEMVisa', '28Degrees'];
    expenseBy = ['VISHAL', 'SWATI'];

    getInitialState() {

        const todayDate = DateService.getTodayDate(); // moment().format('DD/MM/YYYY');
        const thisMonth = DateService.getCurrentMonth(); // moment().format('MMMM');
        const  thisYear = DateService.getCurrentYear(); // moment().format('YYYY');

        return {
            storeName: '',
            description: '',
            amount: '',
            category: this.expenseCategories[0],
            accountDebited: this.accountDebited[0],
            expenseBy: this.expenseBy[0],
            transactionDate: todayDate,
            month: thisMonth,
            year: thisYear,
            recordCreatedOn: todayDate,
            loggedInUser: 'admin' // not used yet
        };
    }

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    saveData = () => {
        // TODO uncomment for firebase connect
        // axios.post('/expenses.json', this.state);
        axios.post('/expense/add', this.state);
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.setState(this.getInitialState());
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div>
                <header>
                    <h1>Enter expenses details:</h1>
                </header>

                <section>
                    <form>
                        <label htmlFor='transactionDate'>
                            <span>Transaction date (dd/mm/yyyy)</span>
                            <input type='text' id='transactionDate' name='transactionDate' value={this.state.transactionDate} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='storeName'>
                            <span>Store name</span>
                            <input type='text' id='storeName' name='storeName' value={this.state.storeName} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='description'>
                            <span>description</span>
                            <input type='text' id='description' name='description' value={this.state.description} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='amount'>
                            <span>expense details (in AUD)</span>
                            <input type='text' id='amount' name='amount' value={this.state.amount} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='category'>
                            <span>Category</span>
                            <select id='category' name='category' value={this.state.category} onChange={this.handleChange}>
                                {
                                    this.expenseCategories.map( (category, i) => {
                                        return <option key={i} value={category}>{category}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='accountDebited'>
                            <span>Account debited</span>
                            <select id='accountDebited' name='accountDebited' value={this.state.accountDebited} onChange={this.handleChange}>
                                {
                                    this.accountDebited.map((accountName, i) => {
                                        return <option key={i} value={accountName}>{accountName}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='expenseBy'>
                            <span>Expense by</span>
                            <select id='expenseBy' name='expenseBy' value={this.state.expenseBy} onChange={this.handleChange}>
                                {
                                    this.expenseBy.map((person, i) => {
                                        return <option key={i} value={person}>{person}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='month'>
                            <span>Month</span>
                            <input type='text' id='month' name='month' value={this.state.month} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='year'>
                            <span>Year</span>
                            <input type='text' id='year' name='year' value={this.state.year} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='recordCreatedOn'>
                            <span>recordCreatedOn</span>
                            <input type='text' id='recordCreatedOn' name='recordCreatedOn' value={this.state.recordCreatedOn} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='loggedInUser'>
                            <span>loggedInUser</span>
                            <input type='text' id='loggedInUser' name='loggedInUser' value={this.state.loggedInUser} onChange={this.handleChange}></input>
                        </label>

                        <div>
                            <Button value='Cancel' onClick={this.handleCancel}>Cancel</Button>
                            <Button value='Save' onClick={this.saveData}>Save Data</Button>
                        </div>


                    </form>
                </section>
            </div>
        );
    }
}