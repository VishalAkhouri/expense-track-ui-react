import React from 'react';
import './header.css';

export class Header extends React.Component {
    render() {
        return <div className="pageTitle"><h1>{this.props.name}</h1></div>;
    }
}
