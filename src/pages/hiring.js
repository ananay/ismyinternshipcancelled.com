import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";

export default class Hiring extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header current={"hiring"} />
                <br />
                <center>
                    <div className={"page activelyHiringPage"}>
                        <h1>🚨 Actively Hiring? We want to know 🚨</h1>
                        <br /><br />
                        <p>
                            Cloudflare recently decided to&nbsp;
                            <a href="https://techcrunch.com/2020/04/02/cloudflare-ceo-pledges-to-double-2020-internship-class/" target="_blank">
                                double its 2020 internship class
                            </a>
                            . As students ourselves, we appreciate every effort by companies to accomodate impacted interns.
                            If your company is hiring - regardless of country or if the internship is remote – please let us know
                            so that we can help those that have lost their internships during this crisis.
                        <br />
                        <br />
                        <p>
                            If you are a recruiter, please get in touch with us via email below:
                        </p>
                        <br />
                        <h2><a href="mailto:i@ananayarora.com">i@ananayarora.com</a></h2>
                        </p>
                    </div>
                </center>
            </div>
        );
    }
}