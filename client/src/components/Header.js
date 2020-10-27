import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class Header extends Component {
    renderComponent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return (
                    <li><a href="/api/logout">log out</a></li>
                );
        }

    }
    render() {
        console.log(this.props)
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link
                            to={this.props.auth ? '/survey' : '/'}
                            className="left brand-logo">
                            Emaily
                        </Link>
                        <ul id="nav-mobile" className="right">
                            {this.renderComponent()}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
function mapStateToProps({ auth }) {
    return { auth }
}
export default connect(mapStateToProps)(Header);
