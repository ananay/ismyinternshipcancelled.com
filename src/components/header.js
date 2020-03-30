import React from 'react';
import { Link } from "gatsby"
import Helmet from 'react-helmet';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
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
                        <Link to="/"><li className={this.props.current == 'home' ? "active" : ""}>Home</li></Link>
                        <Link to="/contribute"><li className={this.props.current == 'contribute' ? "active" : ""}>Contribute</li></Link>
                        <Link to="/disclaimer"><li className={this.props.current == 'disclaimer' ? "active" : ""}>Disclaimer</li></Link>
                        {/*<Link to="/contact"><li className={this.props.current == 'contact' ? "active" : ""}>Contact</li></Link>*/}
                    </ul>
                </div>
                <div className={"clear"}></div>
            </div>
        )
    }

}