import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';


export default class MapOptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            yes: true,
            no: true,
            remote: true,
            freeze: true,
            hiring: true,
        };
        this.toggleStatus = this.toggleStatus.bind(this);
        this.toggleOptionsMenu = this.toggleOptionsMenu.bind(this);
    }

    toggleStatus(status) {
        this.setState(prevState => ({
            [status]: !prevState[status]
        }), () => {
            this.props.onChange({
                yes: this.state.yes,
                no: this.state.no,
                remote: this.state.remote,
                freeze: this.state.freeze,
                hiring: this.state.hiring
            });
        });
    }

    toggleOptionsMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        const { yes, no, remote, freeze, hiring } = this.state;

        return (
            <div>
                <div className={"floating_button_container"}>
                    <Fab onClick={() => { this.toggleOptionsMenu() }}>
                        <FilterListIcon />
                    </Fab>
                </div>
                {this.state.isOpen ? (
                    <div id={"map_options"}>
                        <h3>Is my internship cancelled?</h3>
                        <p>
                            Only show internships with these statuses:
                        </p>
                        <div>
                            <input type="checkbox" name="yes" checked={yes} onChange={() => this.toggleStatus('yes')} />
                            <label className={"company_status_yes"}>😭 Yes</label>
                            <br />
                            <input type="checkbox" name="no" checked={no} onChange={() => this.toggleStatus('no')} />
                            <label className={"company_status_no"}>😅 No</label>
                            <br />
                            <input type="checkbox" name="remote" checked={remote} onChange={() => this.toggleStatus('remote')} />
                            <label className={"company_status_remote"}>👀 Remote</label>
                            <br />
                            <input type="checkbox" name="freeze" checked={freeze} onChange={() => this.toggleStatus('freeze')} />
                            <label className={"company_status_freeze"}>🥶 Freeze</label>
                            <br />
                            <input type="checkbox" name="hiring" checked={hiring} onChange={() => this.toggleStatus('hiring')} />
                            <label className={"company_status_hiring"}>🔥 Hiring</label>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}