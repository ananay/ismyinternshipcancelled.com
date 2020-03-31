import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";

export default class Resources extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header current={"contact"} />
                <center>
                    <div className={"page"}>
                        <h1 className={"page_title"}>Resources</h1>
                        <br />
                        <h2>It's a tough time. Here are a few resources to help you if you have a cancelled internship.</h2>
                        <br />
                        <h2>
                            <ul className={"resources"}>
                                <li>1. <a href="https://summerofcode.withgoogle.com" target="_blank">Google Summer of Code</a></li>
                                <li>2. <a href="https://acadium.com/" target="_blank">Acadium</a> - a marketplace for remote internships</li>
                            </ul>
                        </h2>
                        <br />
                        <br />
                        <h2><a href="https://docs.google.com/forms/d/e/1FAIpQLSdjfsXIOPaHSJu2G5C8rK0BnBWpsOuwc4el9hajn3BnYSNrig/viewform" target="_blank">Have anything to contribute to this list? Fill out this form!</a></h2>
                    </div>
                </center>
            </div>
        );
    }
}