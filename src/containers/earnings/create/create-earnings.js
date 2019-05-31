import React from 'react';
import './create-earnings.scss';

import {DateService} from "../../../common/services/DateService";
import axios from "../../../axios-mongod";
import {Button} from "../../../common/components/styled/Button";

export class CreateEarnings extends React.Component {
    earningCategories = ['salary'];
    accountCredited = ['ANZ', 'NAB'];
    earningBy = ['VISHAL', 'SWATI'];

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState() {

        const todayDate = DateService.getTodayDate(); // moment().format('DD/MM/YYYY');
        const thisMonth = DateService.getCurrentMonth(); // moment().format('MMMM');
        const  thisYear = DateService.getCurrentYear(); // moment().format('YYYY');

        return {
            earningsSource: '',
            description: '',
            amount: '',
            category: this.earningCategories[0],
            accountCredited: this.accountCredited[0],
            earningBy: this.earningBy[0],
            transactionDate: todayDate,
            month: thisMonth,
            year: thisYear,
            recordCreatedOn: todayDate,
            loggedInUser: 'admin' // not used yet
        };
    }

    saveData = () => {
        // TODO uncomment for firebase connect
        // axios.post('/expenses.json', this.state);
        axios.post('/earnings/add', this.state);
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
                    <h1>Enter earnings details:</h1>
                </header>

                <section>
                    <form>
                        <label htmlFor='transactionDate'>
                            <span>Transaction date (dd/mm/yyyy)</span>
                            <input type='text' id='transactionDate' name='transactionDate' value={this.state.transactionDate} onChange={this.handleChange}></input>
                        </label>

                        <label htmlFor='earningsSource'>
                            <span>Earnings source</span>
                            <input type='text' id='earningsSource' name='earningsSource' value={this.state.earningsSource} onChange={this.handleChange}></input>
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
                                    this.earningCategories.map( (category, i) => {
                                        return <option key={i} value={category}>{category}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='accountCredited'>
                            <span>Account credited</span>
                            <select id='accountCredited' name='accountCredited' value={this.state.accountCredited} onChange={this.handleChange}>
                                {
                                    this.accountCredited.map((accountName, i) => {
                                        return <option key={i} value={accountName}>{accountName}</option>
                                    })
                                }
                            </select>
                        </label>

                        <label htmlFor='earningBy'>
                            <span>Earnings by</span>
                            <select id='earningBy' name='earningBy' value={this.state.earningBy} onChange={this.handleChange}>
                                {
                                    this.earningBy.map((person, i) => {
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