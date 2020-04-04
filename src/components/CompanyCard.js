import React from 'react';
import "../styles/CompanyCard.scss";
import { styled } from '@material-ui/styles';
import { Button } from "@material-ui/core";
import Swal from 'sweetalert2';
import { FaCheckCircle } from 'react-icons/fa';

const TheButton = styled(Button)({
    background: 'linear-gradient(30deg, #1b40de, #2cb4ed)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(44, 180, 237, .1)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

export default class CompanyCard extends React.Component {

    constructor(props) {
        super(props);
        this.showNotes = this.showNotes.bind(this);
        this.showBadgeMeaning = this.showBadgeMeaning.bind(this);
        this.notes = this.props.notes || "";
    }

    // Used to prevent scrolling to top of page after Swal modal is closed
    getScrollPosition() {
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        return [scrollX, scrollY];
    }

    showNotes() {
        const [scrollX, scrollY] = this.getScrollPosition();
        Swal.fire({
            title: "Notes for " + this.props.name,
            type: 'info',
            html: this.notes + `<br /><br /><a href='${this.props.official_link}'>${this.props.official_link}</a>`,
            onAfterClose: () => window.scrollTo(scrollX, scrollY)
        });
    }

    showBadgeMeaning() {
        const [scrollX, scrollY] = this.getScrollPosition();
        Swal.fire({
            title: "What the verified badge means",
            text: "When you see a verified badge, it means the company made a public announcement in the press or reached out personally to IsMyInternshipCancelled to officially announce the change",
            onAfterClose: () => window.scrollTo(scrollX, scrollY)
        })
    }

    shortenText(text, limit = 100) {
        if (!text || text.length <= limit) return text;

        const sub = text.substring(0, 100);
        if (!sub.includes(' ')) {
            return sub + ' ...';
        }

        const lastSpace = sub.lastIndexOf(' ');
        return sub.substring(0, lastSpace) + ' ...';
    }

    render() {
        return (
            <div className={"company_card"}>
                <img src={this.props.company_logo}></img>
                <h1 className={"name"}>{this.props.name} {this.props.source == 'Official' && <span className={"badgeMeaningLink"} onClick={() => {this.showBadgeMeaning()}}><FaCheckCircle color={"#1da1f2"} size={20} /></span>}</h1>
                {this.props.status == "Yes" &&
                    <div className={"company_status company_status_yes"}>😭 Yes</div>
                }
                {this.props.status == "Nope" &&
                    <div className={"company_status company_status_no"}>😅 Nope</div>
                }
                {this.props.status == "Remote" &&
                    <div className={"company_status company_status_remote"}>👀 Remote</div>
                }
                {this.props.status == "Freeze" &&
                    <div className={"company_status company_status_freeze"}>🥶 Freeze</div>
                }
                {this.props.status == "Hiring" &&
                    <div className={"company_status company_status_hiring"}>🔥 Hiring</div>
                }
                <div className={"meta"}>
                    <div className={"source"}>
                        <center>
                            {this.props.source == 'Official' ? <TheButton onClick={() => { this.showNotes() }} variant={"contained"}>Official Notice!</TheButton> : ''}
                        </center>
                    </div>
                    <div className={"notes"}>
                        {this.notes != "" && this.props.source != 'Official' && this.notes.length < 100 &&
                            <p>Notes: {this.notes}</p>
                        }
                        <center>
                            {this.notes != "" && this.props.source != 'Official' && this.notes.length >= 100 &&
                                <div className={"shortened_notes"} onClick={this.showNotes}>
                                    <p>Notes: {this.shortenText(this.notes)}</p>
                                    <p className={"notes_read_more"}>Read More</p>
                                </div>
                            }
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}