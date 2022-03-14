import React from 'react';
import AppMode from "./../AppMode.js";

class LoginPage extends React.Component {

    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
        this.state = { faIcon: "fa fa-sign-in" }
    }

    //Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
    }

    handleSubmit = (event) => {
        this.setState({ faIcon: "fa fa-spin fa-spinner" });
        let stay = this.state
        delete stay.faIcon;
        setTimeout(this.login, 1000, stay);
        event.preventDefault();
        this.props.setUserId(this.emailInputRef.current.value);
    }
    login = () => {
        this.props.changeMode(AppMode.ROUNDS);
    }

    render() {
        return (
            <div id="login-mode-div" className="padded-page">
                <center>
                    <h1 />
                    <form id="loginInterface" onSubmit={this.handleSubmit}>
                        <label htmlFor="emailInput" style={{ padding: 0, fontSize: 24 }}>
                            Email:
                <input
                                ref={this.emailInputRef}
                                className="form-control login-text"
                                type="email"
                                placeholder="Enter Email Address"
                                id="emailInput"
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                required={true}
                            />
                        </label>
                        <p />
                        <label htmlFor="passwordInput" style={{ padding: 0, fontSize: 24 }}>
                            Password:
                <input
                                className="form-control login-text"
                                type="password"
                                placeholder="Enter Password"
                                pattern="[A-Za-z0-9!@#$%^&*()_+\-]+"
                                required={true}
                            />
                        </label>
                        <p className="bg-danger" id="feedback" style={{ fontSize: 16 }} />
                        <button
                            type="submit"
                            className="btn-color-theme btn btn-primary btn-block login-btn">
                            <span id="login-btn-icon" className={this.state.faIcon} />
                &nbsp;Log In
            </button>
                        <br />
                        <a role="button" className="login-btn">
                            <img src="https://drive.google.com/uc?export=view&id=1YXRuG0pCtsfvbDSTzuM2PepJdbBpjEut" />
                        </a>
                        <a role="button" className="login-btn">
                            <img src="https://drive.google.com/uc?export=view&id=1ZoySWomjxiCnC_R4n9CZWxd_qXzY1IeL" />
                        </a>
                        <p>
                            <i>Version CptS 489 Sp20</i>
                        </p>
                    </form>
                </center>
            </div>
        )
    }
}

export default LoginPage;
