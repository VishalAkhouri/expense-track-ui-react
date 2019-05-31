import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {DateService} from "../../../common/services/DateService";
import axios from "../../../axios-mongod";
import {EarningsRow} from "../../../components/earningsRow/earnings-row";
import SimpleResultCard from "../../../components/simpleResultCard/simple-result-card";

export class ListEarnings extends  React.Component {
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    years = ['2019', '2020', '2021'];
    state = {
        month: DateService.getCurrentMonth(),
        year: DateService.getCurrentYear(),
        earnings: [],
        amount: {
            staticExpense: '',
            dynamicExpenses: ''
        }
    };

    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fetchAggregatedData = (event) => {
        axios.get(`/earnings/${this.state.month}/${this.state.year}`)
            .then(result => {
                let keys = Object.keys(result.data);
                let earnings = [];
                for (let i=0; i < keys.length ; i++) {
                    let k = keys[i];
                    earnings.push(result.data[k]);
                }
                this.setState({ earnings });
            });
    };

    getTotalEarnings = (event) => {
        console.log(this.state.earnings);
        return this.state.earnings.reduce((total, currentValue) => {
            console.log(total, currentValue.amount);
            return total + currentValue.amount;
        }, 0)
    };

    render() {
        return (
            <div>
                <header>
                    <h1>Earnings summary</h1>
                </header>
                <section>
                    <form>
                        <div>Get earnings for the month and year:</div>

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
                        <EarningsRow expenses={this.state.earnings} />
                    </ul>
                </Grid>

                <SimpleResultCard title='Total earnings:' content={this.getTotalEarnings()}></SimpleResultCard>
            </div>
        );
    }
}