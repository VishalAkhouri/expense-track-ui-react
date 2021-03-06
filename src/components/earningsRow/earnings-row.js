import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class EarningsRow extends Component {
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">transactionDate</TableCell>
                            <TableCell align="right">earningsSource</TableCell>
                            <TableCell align="right">description</TableCell>
                            <TableCell align="right">amount</TableCell>
                            <TableCell align="right">category</TableCell>
                            <TableCell align="right">earningBy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.expenses.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.transactionDate}</TableCell>
                                <TableCell align="right">{row.earningsSource}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.category}</TableCell>
                                <TableCell align="right">{row.earningBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}