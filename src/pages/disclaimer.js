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
                <Header current={"disclaimer"} />
                <div className={"page"}>
                    <h1 className={"page_title"}>⚠️ Disclaimer</h1>
                    <br />
                    <center>
                        <div className={"disclaimer"}>
                            <p>All data represented on this website do not reflect my views. None of the information presented here is my own, (not even the organization I will be interning for). All hiring information is from the internet, through multiple channels and curated over here. The sources are listed on the contribute document. If there's an official notice from the organization with their intern program cancelled, I will link to it.</p>
                            <br />
                            <p>If you're an employer, and would like me to remove your organization from this page, or would like to send an official confirmation to me about the status of your hiring, please reach out to me on <a href="#">i [at] ananayarora.com</a></p>
                            <br />
                            <p>All logos and branding elements used on the homepage are properties of the respective organizations.</p>
                        </div>
                    </center>
                </div>
            </div>
        );
    }
}