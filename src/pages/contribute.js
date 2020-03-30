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
                <Header current={"contribute"} />
                <div className={"page"}>
                    <h1 className={"page_title"}>Contribute</h1>
                    <br />
                    <br />
                    <center>
                        <h1><a href="https://docs.google.com/forms/d/e/1FAIpQLSdjfsXIOPaHSJu2G5C8rK0BnBWpsOuwc4el9hajn3BnYSNrig/viewform" target="_blank">Fill out this form</a>
                        </h1>
                    </center>
                </div>
            </div>
        );
    }
}