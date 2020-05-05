import React from 'react';
import { Link } from "gatsby"
import Helmet from 'react-helmet';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { current } = this.props;
        return (
            <div className={"header"}>
                <Helmet>
                    <title>Is my internship cancelled?</title>
                    <meta name="title" content="Is my internship cancelled?" />
                    <meta name="description" content="Is your internship cancelled? Find out about it here with our live tracker." />
                    <meta name="keywords" content="live, tracking, internship, intern, cancelled, covid, coronavirus, covid19, covid-19, hiring, hr, saveinternships " />
                    <meta name="robots" content="index, follow" />
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="language" content="English" />
                    <meta name="revisit-after" content="1 days" />
                    <meta name="author" content="Ananay Arora" />
                    <meta name="author" content="Kaan Aksoy" />
                    <meta name="author" content="Devyash Lodha" />
                    <meta name="theme-color" content="#000000" />

                    <meta property="og:title" content="Is my internship cancelled?" />
                    <meta property="og:image" content="https://ismyinternshipcancelled.com/img/og-img.png" />
                    <meta property="og:url" content="https://ismyinternshipcancelled.com/" />
                    <meta
                        property="og:description"
                        content="Was your internship cancelled? Is my internship cancelled is your source for the most up-to-date information regarding internship status!"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:determiner" content="the" />
                    <meta property="og:locale" content="en_US" />

                    <link rel="icon" href="img/huh.png" type="image/png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest"></link>

                    <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org/",
                            "@type": "WebSite",
                            "name": "Is My Internship Cancelled",
                            "url": "https://ismyinternshipcancelled.com",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": "https://ismyinternshipcancelled.com/?company={search_term_string}",
                                "query-input": "required name=search_term_string"
                            }
                        }
                    `}
                    </script>
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
