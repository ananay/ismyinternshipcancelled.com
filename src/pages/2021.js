import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";
import sheets from "../controllers/sheets";
import CompanyCard from '../components/CompanyCard.js';
import Swal from 'sweetalert2';
import { FaInfoCircle, FaInfo } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';
import { Box, Grid, Divider } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            counts: {
                yes: 0,
                nope: 0,
                remote: 0,
                freeze: 0,
                hiring: 0
            },
            search: '',
            status: '',
            verifiedOnly: false
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.filterByStatus = this.filterByStatus.bind(this);
        this.showDisclaimer = this.showDisclaimer.bind(this);
        this.showHiring = this.showHiring.bind(this);
        this.verifiedPopup = this.verifiedPopup.bind(this);
        this.updateVerified = this.updateVerified.bind(this);
    }

    componentDidMount() {
        sheets.fetch("2021").then((companies) => {
            this.setState({
                companies: companies,
                counts: sheets.count()
            });
        });

        this.urlParams = new URLSearchParams(window.location.search);
        if (this.urlParams.has('company')) {
            this.setState({
                search: this.urlParams.get('company')
            });
        }
        if (this.urlParams.has('status')) {
            this.setState({
                status: this.urlParams.get('status')
            });
        }
    }

    updateVerified(event) {
        this.setState({
            verifiedOnly: event.target.checked
        });
    }

    updateSearch(t) {
        let company = t.target.value;
        this.setState({
            search: company,
            status: ''
        });

        this.urlParams.set('company', company);
        this.urlParams.set('status', '');
        window.history.replaceState({}, '', '?' + this.urlParams.toString());
    }

    filterByStatus(status) {
        let newStatus = status == this.state.status ? '' : status;
        this.setState({
            search: '',
            status: newStatus
        });

        this.urlParams.set('company', '');
        this.urlParams.set('status', newStatus);
        window.history.replaceState({}, '', '?' + this.urlParams.toString());
    }

    showHiring() {
        Swal.fire({
            title: 'Hiring?',
            html: `
            <div style="text-align: left;">
                <p>Are you actively hiring? We'd love to know!</p>
                <p>If you work at a company that is hiring, <a href="mailto:i@ananayarora.com,lodhad@gmail.com,kaanaksoyaz@gmail.com?subject=%5Bhiring%5D%20%7Breplace%20with%20your%20company%20name%7D%20is%20hiring!">shoot us an email</a> so we can list your company as actively hiring!</p>
                <br />
                <p>If your email client didn't like the email above, our emails are listed below:</p>
                <div style="padding-left: 32px;">
                    <p>Ananay Arora - <a href="mailto:i@ananayarora.com">i@ananayarora.com</a></p>
                    <p>Kaan Aksoy - <a href="mailto:kaanaksoyaz@gmail.com">kaanaksoyaz@gmail.com</a></p>
                    <p>Devyash Lodha - <a href="mailto:lodhad@gmail.com">lodhad@gmail.com</a></p>
                </div>
            </div>
            `
        });
    }

    showDisclaimer() {
        Swal.fire({
            title: 'Disclaimer',
            html: `
            <div style="text-align: left;">
                <p>If you're an employer, and would like me to remove your organization from this page, or would 
                like to send an official confirmation to us about your hiring status, please reach out to us (contact information below)</p>
                <br />
                <p>No information on this page is our own, and none reflects our views.  All hiring 
                information here is curated from the Internet, and the sources are listed in the Contributions 
                document. If there's an official notice from the organization regarding their internship program's status, 
                it will be linked.</p>
                <br />
                <p>All logos and branding elements used on these pages are properties of their respective organizations.</p>
                <br />
                <p>Email us:</p>
                <div style="padding-left: 32px;">
                    <p><a href="mailto:i@ananayarora.com,lodhad@gmail.com,kaanaksoyaz@gmail.com?subject=%5Bimic-complaints%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bshort%20description%7D">Pre-filled email to all of us</a></p>
                    <br />
                    <p><a href="mailto:i@ananayarora.com?subject=%5Bimic-complaints%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bshort%20description%7D">Ananay Arora &lt;i@ananayarora.com&gt;</a></p>
                    <p><a href="mailto:kaanaksoyaz@gmail.com?subject=%5Bimic-complaints%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bshort%20description%7D">Kaan Aksoy &lt;kaanaksoyaz@gmail.com&gt;</a></p>
                    <p><a href="mailto:lodhad@gmail.com?subject=%5Bimic-complaints%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bshort%20description%7D">Devyash Lodha &lt;lodhad@gmail.com&gt;</a></p>
                </div>
            </div>`
        });
    }

    verifiedPopup() {
        Swal.fire({
            title: 'Get Verified!',
            html: `
            <div style="text-align: left;">
                <p>If you're an employer, please <a href="mailto:i@ananayarora.com,lodhad@gmail.com,kaanaksoyaz@gmail.com?subject=%5Bimic-verification%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bstatus%7D&body=Internship%20Status%3A%20%7Bbau%7Cremote%7Ccancelled%7D%0D%0AHiring%20Status%3A%20%7Bfrozen%7Cbau%7D%0D%0ADate%20of%20status%20change%3A%20%7Bdate%7D%0D%0AAuthoritative%20Source%3A%20%7Blink%20or%20attached%20to%20email%7D">email us</a> to verify your company's internship/hiring status!</p>
                <p>Let's reduce false information! Most information is crowdsourced, so if you are a recruiter, or work at a company, email us to verify your company's status!</p>
                <br />
                <p><a href="mailto:i@ananayarora.com,lodhad@gmail.com,kaanaksoyaz@gmail.com?subject=%5Bimic-verification%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bstatus%7D&body=Internship%20Status%3A%20%7Bbau%7Cremote%7Ccancelled%7D%0D%0AHiring%20Status%3A%20%7Bfrozen%7Cbau%7D%0D%0ADate%20of%20status%20change%3A%20%7Bdate%7D%0D%0AAuthoritative%20Source%3A%20%7Blink%20or%20attached%20to%20email%7D">Please fill out this pre-filled email</a></p>
                <br />
                <p>If the above link doesn't work, email us all at:</p>
                <div style="padding-left: 32px;">
                    <br />
                    Ananay Arora - <a href="mailto:i@ananayarora.com?subject=%5Bimic-verification%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bstatus%7D&body=Internship%20Status%3A%20%7Bbau%7Cremote%7Ccancelled%7D%0D%0AHiring%20Status%3A%20%7Bfrozen%7Cbau%7D%0D%0ADate%20of%20status%20change%3A%20%7Bdate%7D%0D%0AAuthoritative%20Source%3A%20%7Blink%20or%20attached%20to%20email%7D">i@ananayarora.com</a><br />
                    Kaan Aksoy - <a href="mailto:kaanaksoyaz@gmail.com?subject=%5Bimic-verification%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bstatus%7D&body=Internship%20Status%3A%20%7Bbau%7Cremote%7Ccancelled%7D%0D%0AHiring%20Status%3A%20%7Bfrozen%7Cbau%7D%0D%0ADate%20of%20status%20change%3A%20%7Bdate%7D%0D%0AAuthoritative%20Source%3A%20%7Blink%20or%20attached%20to%20email%7D">kaanaksoyaz@gmail.com</a><br />
                    Devyash Lodha - <a href="mailto:lodhad@gmail.com?subject=%5Bimic-verification%5D%20%7Breplace%20with%20your%20company%20name%7D%20%7Bstatus%7D&body=Internship%20Status%3A%20%7Bbau%7Cremote%7Ccancelled%7D%0D%0AHiring%20Status%3A%20%7Bfrozen%7Cbau%7D%0D%0ADate%20of%20status%20change%3A%20%7Bdate%7D%0D%0AAuthoritative%20Source%3A%20%7Blink%20or%20attached%20to%20email%7D">lodhad@gmail.com</a><br />
                </div>
                <br />
                <p>Please redact any information you don't want public! We try our best to remove PII but things slip through!</p>
            </div>`
        });
    }

    renderHeader() {
        return (
            <div>
                <div className={"banner banner-small"}>
                    <p>
                        Internship cancelled?&nbsp;
                        <a href="https://quaranteam.tech" target="_blank">Find a side project on Quaranteam.</a>
                    </p>
                </div>
                <h1 className={"page_title"}>🤔 is my internship cancelled?</h1>
                <br />
                <p onClick={this.showDisclaimer} className={"page_subtitle"}>
                    We hope not!
                    <span alt="disclaimer" className={"disclaimer_icon"}><FaInfoCircle color={"#1da1f2"} size={20} /></span>
                </p>
            </div>
        );
    }

    renderContributions() {
        return (
            <p>
                Made by <a href="https://ananayarora.com" target="_blank">Ananay Arora</a>
                , <a href="https://kaaniboy.github.io/" target="_blank">Kaan Aksoy</a>
                , and <a href="https://github.com/yash101" target="_blank">Devyash Lodha</a>
                {/* <a href="#" onClick={this.showDisclaimer} style={{cursor: 'pointer'}}>Show Disclaimer</a> */}
            </p>
        );
    }

    renderStatusOptions() {
        const selectedClass = 'metric_selected';
        let yesClass = this.state.status === 'yes' ? selectedClass : '';
        let nopeClass = this.state.status === 'nope' ? selectedClass : '';
        let remoteClass = this.state.status === 'remote' ? selectedClass : '';
        let freezeClass = this.state.status === 'freeze' ? selectedClass : '';
        let hiringClass = this.state.status === 'hiring' ? selectedClass : '';

        return (
            <div className={"metrics"}>
                <div className={"metric " + hiringClass} onClick={() => this.filterByStatus('hiring')}>
                    <div className={"metric_number"}>{this.state.counts.hiring}</div>
                    <div className={"metric_title company_status_hiring no_select"}>🔥 Hiring</div>
                </div>
                <div className={"metric " + yesClass} onClick={() => this.filterByStatus('yes')}>
                    <div className={"metric_number"}>{this.state.counts.yes}</div>
                    <div className={"metric_title company_status_yes no_select"}>😭 Yes</div>
                </div>
                <div className={"metric " + nopeClass} onClick={() => this.filterByStatus('nope')}>
                    <div className={"metric_number"}>{this.state.counts.nope}</div>
                    <div className={"metric_title company_status_no no_select"}>😅 Nope</div>
                </div>
                <div className={"metric " + remoteClass} onClick={() => this.filterByStatus('remote')}>
                    <div className={"metric_number"}>{this.state.counts.remote}</div>
                    <div className={"metric_title company_status_remote no_select"}>👀 Remote</div>
                </div>
                <div className={"metric " + freezeClass} onClick={() => this.filterByStatus('freeze')}>
                    <div className={"metric_number"}>{this.state.counts.freeze}</div>
                    <div className={"metric_title company_status_freeze no_select"}>🥶 Freeze</div>
                </div>
            </div>
        );
    }

    getImageName(name) {
        name = name.trim();
        name = name.split(' ').join('-');
        name = name.toLowerCase();
        if (name.includes("/")) {
            name = name.split('/').join('-');
            name = name.toLowerCase();
        }
        return "/images/" + name + ".jpg";
    }

    renderCompanyCards() {
        return (
            <div className={"list"}>
                {this.state.companies
                    .filter(
                        c => (c.name.toLowerCase().includes(this.state.search.toLowerCase())
                            && c.status.toLowerCase().includes(this.state.status)))
                    .map((c) => {
                        if (
                            (this.state.verifiedOnly == true && c.source == "Official") ||
                            (this.state.verifiedOnly == false)
                        ) {
                            return (
                                <CompanyCard
                                    company_logo={this.getImageName(c.name)}
                                    status={c.status}
                                    name={c.name}
                                    notes={c.notes}
                                    source={c.source}
                                    official_link={c.official_link}
                                    linkedin={c.linkedin}
                                    key={c.name}
                                />
                            )
                        }
                    })
                }
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        const contributions = this.renderContributions();
        const statusOptions = this.renderStatusOptions();
        const companyCards = this.renderCompanyCards();

        return (
            <div>
                <Header current={"2021"} />
                <center>
                    <br />
                    <div className={"page internship-statuses-page"}>
                        {/* {header} */}
                        <br />
                        <br />
                        <br />
                        <br />
                        {/* {contributions} */}
                        <h1>2021 statuses</h1>
                        {statusOptions}
                        <div className={"banner"}>
                            <p style={{ lineHeight: 1.8 }}>Are you Hiring? <a href="#" onClick={this.showHiring} style={{ cursor: 'pointer' }}>let us know here!</a></p>
                        </div>
                        <div className={"banner"}>
                            <p style={{ lineHeight: 1.8 }}>Company rep?&nbsp;&nbsp;<FaCheckCircle color={"#1da1f2"} size={20} />&nbsp;<a href="#" onClick={() => { this.verifiedPopup() }}>Verify your company here.</a></p>
                        </div>
                        <br />
                        <br />
                        <br />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color={"#1da1f2"}
                                    icon={<FaCheckCircle fontSize="small" />}
                                    checkedIcon={<FaCheckCircle fontSize="small" color={"#1da1f2"} />}
                                    name="checkedI"
                                    onChange={(event) => { this.updateVerified(event) }}
                                />
                            }
                            label="Show Verified Companies Only"
                        />
                        <br />
                        <br />
                        <input
                            type={"text"}
                            placeholder={"Filter by company name..."}
                            className={"search_box"}
                            value={this.state.search}
                            onChange={this.updateSearch}
                        />
                        {companyCards}
                    </div>
                </center>
            </div>
        );
    }
}
