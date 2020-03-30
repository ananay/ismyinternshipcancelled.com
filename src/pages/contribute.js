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
                        <p>Go to the Google Spreadsheet and make sure you write a comment on the field you want to change!<br />Thanks in advance.</p>
                        <br /><br />
                        <h1><a href="https://docs.google.com/spreadsheets/d/1MoVx8Df8oPFRPRgAb6xpZ9wmh_bInZaRxs2Zj_dFR7U/edit#gid=0" target="_blank">Go here to contribute</a>
                        </h1>
                    </center>
                </div>
            </div>
        );
    }
}