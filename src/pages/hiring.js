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
                    <div className={"activelyHiring__page"}>
                        <h1>🚨 Are you actively hiring? We want to know. 🚨 </h1>
                        <br /><br />
                        <p><a href="https://techcrunch.com/2020/04/02/cloudflare-ceo-pledges-to-double-2020-internship-class/">CloudFlare recently decided to double the internship class of 2020</a> and we absolutely appreciate that, and want to honor those companies that are doing so.</p>
                        <br />
                        <p>If you're hiring – no matter what country you're in or if your internship is remote – please help out those that have lost their internships during this crisis.</p>
                        <br />
                        <p>If you're a recruiter, please get in touch with me (Ananay Arora) via email below.</p>
                        <br />
                        <h1><a href="mailto:i@ananayarora.com">i@ananayarora.com</a></h1>
                    </div>
                </center>
            </div>
        );
    }
}