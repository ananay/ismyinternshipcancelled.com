import React from 'react';
import "../styles/CompanyCard.scss";
import { styled } from '@material-ui/styles';
import { Button } from "@material-ui/core";
import Swal from 'sweetalert2';
import { FaCheckCircle } from 'react-icons/fa';
import CompanyPopup from '../components/CompanyPopup';

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
        this.showSources = this.showSources.bind(this);
        this.showBadgeMeaning = this.showBadgeMeaning.bind(this);
        this.showCompanyCardModal = this.showCompanyCardModal.bind(this);
        this.notes = this.props.notes || "";
        this.sources = this.props.source || "";
        this.state = {
            modalOpen: false
        }
    }

    showNotes() {
        // Split the notes
        let split_notes = this.notes.split(";");
        let split_notes_html = "";
        if (split_notes.length > 1) {
            split_notes_html = "<div style='text-align:left;margin-left:30px;'><ul>";
            for (let i = 0; i < split_notes.length; i++) {
                split_notes_html += "<li>" + split_notes[i] + "<br /></li>";
            }
            split_notes_html += "</ul></div>";
        } else {
            split_notes_html = this.notes;
        }

        Swal.fire({
            title: "Notes for " + this.props.name,
            heightAuto: false,
            html: split_notes_html + `<br /><br /><a href='${this.props.official_link}'>${this.props.official_link}</a>`,
        });
    }

    showSources() {
        let split_sources = this.sources.split(";");
        let split_sources_html = "";
        if (split_sources.length > 1) {
            split_sources_html = "<div style='text-align:left;margin-left:30px;'><ul>";
            for (let i = 0; i < split_sources.length; i++) {
                split_sources_html += "<li>" + split_sources[i] + "<br /></li>";
            }
            split_sources_html += "</ul></div>";
        } else {
            split_sources_html = this.sources;
        }

        Swal.fire({
            title: "Sources for " + this.props.name,
            heightAuto: false,
            html: split_sources_html + `<br /><br /><a href='${this.props.official_link}'>${this.props.official_link}</a>`,
        });
    }

    showBadgeMeaning() {
        Swal.fire({
            title: "What the verified badge means",
            text: "When you see a verified badge, it means the company made a public announcement in the press or reached out personally to IsMyInternshipCancelled to officially announce the change",
        });
    }

    showCompanyCardModal() {
        // this.setState({
        //     modalOpen: true
        // })
    }

    render() {
        return (
            <div className={"company_card"} onClick={() => { this.showCompanyCardModal() }}>
                <CompanyPopup
                    {...this.props}
                    modalOpen={this.state.modalOpen}
                />
                <img src={this.props.company_logo}></img>
                <h1 className={"name"}>{this.props.name} {this.props.source == 'Official' && <span className={"badgeMeaningLink"} onClick={() => { this.showBadgeMeaning() }}><FaCheckCircle color={"#1da1f2"} size={20} /></span>}</h1>
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
                            {this.notes != "" && this.props.source != 'Official' && !this.notes.includes(";") && this.notes.length >= 100 &&
                                <div className={"shortened_notes"}>
                                    <p>Notes: {shortenText(this.notes)}</p>
                                    <button className={"read_more_button"} onClick={this.showNotes}>🗒 Read More</button>
                                </div>
                            }
                            {this.notes != "" && this.props.source != 'Official' && this.notes.includes(";") && this.notes.length >= 100 &&
                                <div className={"shortened_notes"}>
                                    <button className={"read_more_button"} onClick={this.showNotes}>
                                        📝 Read All Notes ({this.notes.split(';').length})
                                    </button>
                                </div>
                            }
                            {this.sources != "" && this.props.source != 'Official' &&
                                <div className={"shortened_notes"} onClick={this.showSources}>
                                    <button className={"read_more_button"}>
                                        🔌 Show Sources ({this.sources.split(';').length})
                                    </button>
                                </div>
                            }
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}

function shortenText(text, limit = 100) {
    if (!text || text.length <= limit) return text;

    const sub = text.substring(0, 100);
    if (!sub.includes(' ')) {
        return sub + ' ...';
    }

    const lastSpace = sub.lastIndexOf(' ');
    return sub.substring(0, lastSpace) + ' ...';
}
