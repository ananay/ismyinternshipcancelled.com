import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";
import sheets from "../controllers/sheets";
import CompanyCard from '../components/CompanyCard.js';
import Swal from 'sweetalert2';
import { FaInfoCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';
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
        sheets.fetch().then((companies) => {
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
            <p>Are you actively hiring? Cloudflare recently decided to <a href="https://techcrunch.com/2020/04/02/cloudflare-ceo-pledges-to-double-2020-internship-class/" target="_blank">double its internship size</a>.</p>
            <p>As students ourself, we greatly appreciate and value every effort by companies to accomodate impacted interns.</p>
            <p>Regardless of whether the internship is in person or remote, if your company is hiring, please contact us so we can help those who lost their internships due to this crisis!</p>
            <br />
            <p>If you are a recruiter, please <a href="mailto:hiring@ismyinternshipcancelled.com?subject=Hiring%3A%20%7Bcompany%20name%7D" target="_blank">contact us!</a></p>
            `
        });
    }

    showDisclaimer() {
        Swal.fire({
            title: 'Disclaimer',
            html: `
            <p>If you're an employer, and would like me to remove your organization from this page, or would 
            like to send an official confirmation to us about your hiring status, please reach out at 
            <a href="#">i [at] ananayarora.com</a></p>
            <br />
            <p>No information on this page is our own, and none reflects our views.  All hiring 
            information here is curated from the Internet, and the sources are listed in the Contributions 
            document. If there's an official notice from the organization regarding their internship program's status, 
            it will be linked.</p>
            <br />
            <p>All logos and branding elements used on these pages are properties of their respective 
            organizations.</p>`
        });
    }

    verifiedPopup() {
        Swal.fire({
            title: 'Get your company verified',
            html: `
            <p>We're encouraging all companies to verify their current internship status to avoid any false information floating around during this situation. If you're a recruiter or company representative, please email any one of us from your <b>official email</b>. <br /><br />
            Ananay Arora - <a href="mailto:i@ananayarora.com">i@ananayarora.com</a><br />
            Kaan Aksoy - <a href="mailto:kaanaksoyaz@gmail.com">kaanaksoyaz@gmail.com</a><br />
            Devyash Lodha - <a href="mailto:lodhad@gmail.com">lodhad@gmail.com</a><br />
            <br /><br />
            <b>Your identity will be kept anonymous and all communication will be private.</b>`
        });
    }

    renderHeader() {
        return (
            <div>
                <h1 className={"page_title"}>🤔 is my internship cancelled?</h1>
                <br />
                <p onClick={this.showDisclaimer} className={"page_subtitle"}>
                    We hope not.
                    <span className={"disclaimer_icon"}><FaInfoCircle color={"#1da1f2"} size={20} /></span>
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
                                    company_logo={c.logo}
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
                <Header current={"home"} />
                <center>
                    <div className={"banner"}>
                        <p>Are you hiring? <a onClick={this.showHiring} style={{cursor: 'pointer'}}>We want to know.</a></p>
                    </div>
                    <br />
                    <div className={"banner"}>
                        <p>Company representative?&nbsp;&nbsp;&nbsp;<FaCheckCircle color={"#1da1f2"} size={20} />&nbsp;&nbsp;<a href="#" onClick={() => { this.verifiedPopup() }}>Verify your company here.</a></p>
                    </div>
                    <br />
                    <div className={"page"}>
                        {header}
                        <br />
                        {contributions}
                        {statusOptions}
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
                            label="Show Verified Only"
                        />
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
