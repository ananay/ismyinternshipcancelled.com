import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header current={"contact"} />
                <div className={"page"}>
                    <h1 className={"page_title"}>Contact</h1>
                </div>
            </div>
        );
    }
}