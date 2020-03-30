import React from 'react';
import "../styles/CompanyCard.scss";
export default class CompanyCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"company_card"}>
                <img src={this.props.company_logo}></img>
                <h1 className={"name"}>{this.props.name}</h1>
                {this.props.status == "Yes" &&
                    <div className={"company_status company_status_yes"}>😭 Yes</div>
                }
                {this.props.status == "Nope" &&
                    <div className={"company_status company_status_no"}>😅 Nope</div>
                }
                {this.props.status == "Umm" &&
                    <div className={"company_status company_status_umm"}>👀 Remote</div>
                }
                <div className={"meta"}>
                    <div className={"notes"}>{this.props.notes == '' ?  '': "Notes: " + this.props.notes}</div>
                    <div className={"source"}>
                        {this.props.source == 'Official' ? <p>Source: <a href={this.props.official_link}>Official</a></p> : ''}
                    </div>
                </div>
            </div>
        )
    }

}