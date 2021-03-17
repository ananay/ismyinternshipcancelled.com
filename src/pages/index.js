import React from 'react';
import Header from '../components/header';
import { FaInfoCircle, FaInfo } from 'react-icons/fa';
import { Link } from "gatsby";
import { styled } from '@material-ui/styles';
import { Button } from "@material-ui/core";
import "../styles/home.scss";

export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    renderHeader() {
        return (
            <div className={"header-dark_mode"}>
                <h1 className={"page_title"}>🤔 is my internship cancelled?</h1>
                <br />
                
                {/* <p onClick={this.showDisclaimer} className={"page_subtitle"}>
                    We hope not!
                    <span alt="disclaimer" className={"disclaimer_icon"}><FaInfoCircle color={"#1da1f2"} size={20} /></span>
                </p> */}
            </div>
        );
    }

    

    renderContributions() {
        return (
            <p class={"contributions"}>
                Made by <a href="https://ananayarora.com" target="_blank">Ananay Arora</a>
                , <a href="https://kaaniboy.github.io/" target="_blank">Kaan Aksoy</a>
                , and <a href="https://github.com/yash101" target="_blank">Devyash Lodha</a>
                {/* <a href="#" onClick={this.showDisclaimer} style={{cursor: 'pointer'}}>Show Disclaimer</a> */}
            </p>
        );
    }

    render() {

        const renderHeader = this.renderHeader();
        const renderContributions = this.renderContributions();

        const TheButton = styled(Button)({
            background: 'linear-gradient(315deg, #4c4177 0%, #2a5470 74%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(44, 180, 237, .1)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        });

        return (
            <div style={{height: '84%'}}> 
                <Header current={"home"}></Header>
                <div className={"intro"}>
                    {renderHeader}
                    <div class={"tagline"}>
                        <p>Tracker for Internships affected by COVID-19.</p>
                    </div>
                    {renderContributions}
                    {/* <br />
                    <br />
                    <br />
                    <br /> */}
                    {/* <TheButton onClick={() => { }} variant={"contained"}>What is this website about?</TheButton> */}
                    <br />
                    <div className={"status_buttons"}>
                        <Link to="/2021"><TheButton onClick={() => { }} variant={"contained"}>2021 statuses</TheButton></Link>
                        <Link to="/2020"><TheButton onClick={() => { }} variant={"contained"}>2020 statuses</TheButton></Link>
                    </div>
                    <br />
                    <div className={"press"}>
                        <div class={"as_seen_on"}>As seen on</div>
                        <a 
                            href={"https://techcrunch.com/2020/04/02/cloudflare-ceo-pledges-to-double-2020-internship-class/"}
                            target={"_blank"}
                        >
                            <img src={"press_logos/techcrunch.png"} />
                        </a>
                        <a 
                            href={"https://www.npr.org/2020/05/21/858598827/theres-still-time-to-get-a-remote-summer-internship"}
                            target={"_blank"}
                        >
                            <img src={"press_logos/npr.png"} />
                        </a>
                        <a 
                            href={"https://twitter.com/Quicktake/status/1255889747383250948"}
                            target={"_blank"}
                        >
                            <img src={"press_logos/bloomberg.png"} />
                        </a>
                        <a
                            href={"https://www.theatlantic.com/health/archive/2020/04/how-coronavirus-will-change-young-peoples-lives/609862/"}
                            target={"_blank"}>
                            <img src={"press_logos/atlantic.png"} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

}