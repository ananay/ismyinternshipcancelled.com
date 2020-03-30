import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";
import sheets from "../controllers/sheets";
import CompanyCard from '../components/CompanyCard.js';

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            counts: {
                yes: 0,
                nope: 0,
                umm: 0,
                freeze: 0
            },
            search: '',
            status: '',
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.filterByStatus = this.filterByStatus.bind(this);
    }

    componentDidMount() {
        sheets.fetch().then((r) => {
            this.setState({
                data: r,
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
        this.setState({
            search: '',
            status: status
        });

        this.urlParams.set('company', '');
        this.urlParams.set('status', status);
        window.history.replaceState({}, '', '?' + this.urlParams.toString());
    }

    render() {
        return (
            <div>
                <Header current={"home"} />
                <center>
                    <div className={"page"}>
                        <h1 className={"page_title"}>🤔 is my internship cancelled?</h1>
                        <br />
                        <p>We hope not.</p>
                        <br />
                        <p className={"credits"}>made by <a href="https://ananayarora.com" target="_blank">@ananayarora</a> and <a href="https://kaaniboy.github.io/" target="_blank">@kaaniboy</a></p>
                        <div className={"metrics"}>
                            <div className={"metric"} onClick={() => this.filterByStatus('yes')}>
                                <div className={"metric_number"}>{this.state.counts.yes}</div>
                                <div className={"metric_title metric_yes"}>😭 Yes</div>
                            </div>
                            <div className={"metric"} onClick={() => this.filterByStatus('nope')}>
                                <div className={"metric_number"}>{this.state.counts.nope}</div>
                                <div className={"metric_title metric_nope"}>😅 Nope</div>
                            </div>
                            <div className={"metric"} onClick={() => this.filterByStatus('remote')}>
                                <div className={"metric_number"}>{this.state.counts.remote}</div>
                                <div className={"metric_title metric_remote"}>👀 Remote</div>
                            </div>
                            <div className={"metric"} onClick={() => this.filterByStatus('freeze')}>
                                <div className={"metric_number"}>{this.state.counts.freeze}</div>
                                <div className={"metric_title metric_freeze"}>🥶 Freeze</div>
                            </div>
                        </div>
                        <input
                            type={"text"}
                            placeholder={"Company name here..."}
                            className={"search_box"}
                            value={this.state.search}
                            onChange={this.updateSearch}
                        />
                        <div className={"list"}>
                            {this.state.data.map((r) => {
                                if (r[0].toLowerCase().includes(this.state.search.toLowerCase())
                                    && r[1].toLowerCase().includes(this.state.status)) {
                                    return (
                                        <CompanyCard
                                            company_logo={r[6]}
                                            status={r[1]}
                                            name={r[0]}
                                            notes={r[2]}
                                            source={r[3]}
                                            official_link={r[4]}
                                            linkedin={r[5]}
                                            key={r[0]}
                                        />
                                    )
                                } else {
                                    return (<span key={r[0]}></span>);
                                }
                            })}
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}