import React from 'react';
import Modal from 'react-modal';

export default class CompanyPopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                isOpen={this.props.modalOpen}
            >
                <img src={this.props.company_logo}></img>
                <br />
                <h1>{this.props.name}</h1>
            </Modal>
        );
    }

}