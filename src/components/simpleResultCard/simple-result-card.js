import React, {Component} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SimpleResultCard extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {this.props.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        AUD {this.props.content}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(SimpleResultCard);
