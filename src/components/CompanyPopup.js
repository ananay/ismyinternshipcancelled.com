import React from 'react';
import "../styles/CompanyPopup.scss";

export default class CompanyPopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={"company_popup"}>
                <center>
                    <h1 className={"name"}>{this.props.name}</h1>
                    <img className={"company_logo"} src={this.props.company_logo}></img>
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
                        <div className={"notes"}>{this.props.notes == '' ?  '': "Notes: " + this.props.notes}</div>
                        <div className={"source"}>
                            {this.props.source == 'Official' ? <p>Source: <a href={this.props.official_link}>Official</a></p> : ''}
                        </div>
                    </div>
                </center> 
            </div>
        );
    }

}