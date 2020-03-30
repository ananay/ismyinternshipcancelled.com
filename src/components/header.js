import React from 'react';
import { Link } from "gatsby"
export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"header"}>
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