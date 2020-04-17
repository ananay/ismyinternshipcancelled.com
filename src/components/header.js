import React from 'react';
import { Link } from "gatsby"
import Helmet from 'react-helmet';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {current} = this.props;
        return (
            <div className={"header"}>
                <Helmet>
                    <title>Is my internship cancelled?</title>
                    <meta name="title" content="Is my internship cancelled?" />
                    <meta name="description" content="Is your internship cancelled? Find out about it here with our live tracker." />
                    <meta name="keywords" content="live, tracking, internship, intern, cancelled, covid, coronavirus, covid19" />
                    <meta name="robots" content="index, follow" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="language" content="English" />
                    <meta name="revisit-after" content="1 days" />
                    <meta name="author" content="Ananay Arora" />
                </Helmet>
                <div className={"menu"}>
                    <ul>
                        <Link to="/"><li className={current == 'home' ? "active" : ""}>Home</li></Link>
                        <Link to="/map"><li className={current == 'map' ? "active" : ""}>Map</li></Link>
                        <Link to="/feed"><li className={current == 'feed' ? "active" : ""}>Feed</li></Link>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjfsXIOPaHSJu2G5C8rK0BnBWpsOuwc4el9hajn3BnYSNrig/viewform" target="_blank"><li>Contribute</li></a>
                    </ul>
                </div>
                <div className={"clear"}></div>
            </div>
        )
    }
}