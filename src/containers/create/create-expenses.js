import React from 'react';
import './create-expenses.scss';

export class CreateExpenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            store: '',
            expense: '',
            expenseBy: '',
            expenseDated: '',
            category: ''
        }
    }

    saveData = () => {
        console.log('data saved called', this.state);
    };

    handleCancel(evt) {
        evt.preventDefault();
        console.log('handle cancel clicked');
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <section>
                <form>
                    <label htmlFor='store'>
                        <span>Store details</span>
                        <input type='text' id='store' name='store' value={this.state.store} onChange={this.handleChange}></input>
                    </label>

                    <label htmlFor='expense'>
                        <span>expense details (in AUD)</span>
                        <input type='text' id='expense' name='expense' value={this.state.expense} onChange={this.handleChange}></input>
                    </label>

                    <label htmlFor='expenseBy'>
                        <span>expense made by (in AUD)</span>
                        <input type='text' id='expenseBy' name='expenseBy' value={this.state.expenseBy} onChange={this.handleChange}></input>
                    </label>

                    <label htmlFor='expenseDated'>
                        <span>expense made on (dd/mm/yyyy)</span>
                        <input type='text' id='expenseDated' name='expenseDated' value={this.state.expenseDated} onChange={this.handleChange}></input>
                    </label>

                    <label htmlFor='category'>
                        <span>Category</span>
                        <input type='text' id='category' name='category' value={this.state.category} onChange={this.handleChange}></input>
                    </label>

                    <div>
                        <input type='button' value='Save' onClick={this.saveData}/>
                        <button onClick={this.handleCancel}>Cancel</button>
                    </div>


                </form>
            </section>
        );
    }
}