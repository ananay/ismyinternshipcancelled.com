import React from 'react';
import Header from '../components/header.js';
import "../styles/home.scss";
import "../styles/feed.scss";
import sheets from "../controllers/sheets";
import moment from 'moment';

export default class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        const FEED_LENGTH = 20;

        sheets.fetch().then((companies) => {
            companies = companies
                .filter(c => c.timestamp && c.timestamp !== '')
                .map(c => {
                    c.timestamp = Date.parse(c.timestamp) || null;
                    return c;
                })
                .sort((a, b) => a.timestamp - b.timestamp)
                .reverse()
                .slice(0, FEED_LENGTH);
            
            this.setState({companies});
        });
    }

    renderFeed(companies) {
        return companies.map(c => {
            const companyURL = '/?company=' + encodeURIComponent(c.name);
            return (
                <li key={c.name}>
                    <a href={companyURL} target="_blank">
                        {c.logo && <img src={c.logo} className={"company-logo"}/>}
                        {c.name}
                    </a>
                    &nbsp;was updated to&nbsp;
                    {c.status === 'Hiring' && <span className="status company_status_hiring">Hiring 🔥</span>}
                    {c.status === 'Yes' && <span className="status company_status_yes">Yes 😭</span>}
                    {c.status === 'Nope' && <span className="status company_status_no">Nope 😅</span>}
                    {c.status === 'Remote' && <span className="status company_status_remote">Remote 👀</span>}
                    {c.status === 'Freeze' && <span className="status company_status_freeze">Freeze 🥶</span>}
                    &nbsp;
                    {moment(c.timestamp).fromNow()}
                </li>
            );
        });
    }

    render() {
        const { companies } = this.state;
        const feed = this.renderFeed(companies);

        return (
            <div>
                <Header current={"feed"} />
                <center>
                    <h1>Recent Updates</h1>
                    <ul className={"feed-container"}>
                        {feed}
                    </ul>
                </center>
            </div>
       );
    }
}