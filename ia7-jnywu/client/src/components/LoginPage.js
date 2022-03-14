import React from 'react';
import AppMode from "./../AppMode.js";
import CreateAccountDialog from './CreateAccountDialog.js';
import ResetPasswordDialog from './ResetPasswordDialog.js';

class LoginPage extends React.Component {

    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state = {
            loginBtnIcon: "fa fa-sign-in",
            loginBtnLabel: "Log In",
            // faIcon: "fa fa-sign-in",
            showCreateAccountDialog: false,
            showResetPasswordDialog: false,
            newAccountCreated: false,
            passWordUpdated: false
        };
    }

    //Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
    }

    //handleLogin -- Callback function that sets up initial app state upon login.
    handleLogin = () => {
        //Stop spinner
        this.setState({
            loginBtnIcon: "fa fa-sign-in",
            loginBtnLabel: "Log In"
        });
        //Set current user
        this.props.setUserId(this.emailInputRef.current.value);
        //Trigger switch to FEED mode (default app landing page)
        this.props.changeMode(AppMode.ROUNDS);
    }

    //handleLoginSubmit -- Called when user clicks on login button. Initiate spinner
    //for 1 second and call handleLogin to do the work.
    handleLoginSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loginBtnIcon: "fa fa-spin fa-spinner",
            loginBtnLabel: "Logging In..."
        });
        //Initiate spinner for 1 second
        setTimeout(this.handleLogin, 1000);
    }

    //handleLoginChange -- Check the validity of the username (email address)
    //password entered into the login page, setting the customValidity message 
    //appropriately. 
    handleLoginChange = () => {
        let thisUser = this.emailInputRef.current.value;
        let data = JSON.parse(localStorage.getItem(thisUser));
        //Check username and password:
        if (data == null) {
            this.emailInputRef.current.setCustomValidity("No account with this email" +
                "address exists. Choose 'Create an account'.");
            return; //Exit the function; no need to check pw validity
        } else {
            this.emailInputRef.current.setCustomValidity("");
        }
        if (data.password != this.passwordInputRef.current.value) {
            this.passwordInputRef.current.setCustomValidity("The password you entered" +
                "is incorrect. Please try again or choose 'Reset your password'.");
        } else {
            this.passwordInputRef.current.setCustomValidity("");
        }
    }

    //newAccountCreated -- Called by child CreateAccountDialog component when new user account
    //successfully created. Hide the dialog and display a message inviting user to log in
    //with new credentials.
    newAccountCreated = () => {
        this.setState({
            newAccountCreated: true,
            showCreateAccountDialog: false
        });
    }

    //cancelCreateAccount -- called by child CreateAccountDialog component when user
    //decides to cancel creation of new account by clicking the "X" in top-right of dialog.
    cancelCreateAccount = () => {
        this.setState({ showCreateAccountDialog: false });
        this.setState({ showResetPasswordDialog: false });
    }

    resetPasswordSuccess = () => {
        this.setState({ passWordUpdated: true });
        this.setState({ showResetPasswordDialog: false });
    }

    render() {
        return (
            <div id="login-mode-div" className="padded-page">
                <center>
                    <h1 />
                    {this.state.newAccountCreated ? <p className="emphasis">New account created! Enter credentials to log in.</p> : null}
                    {this.state.passWordUpdated ? <p className="emphasis">Password updated! Enter new password to log in.</p> : null}
                    <form id="loginInterface" onSubmit={this.handleLoginSubmit} onChange={this.handleLoginChange}>
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
                                ref={this.passwordInputRef}
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
                            <span id="login-btn-icon" className={this.state.loginBtnIcon} />
                            &nbsp;{this.state.loginBtnLabel}
                        </button>
                        <br />
                        <p>
                            <button type="button" className="btn btn-link login-link" onClick={() => { this.setState({ showCreateAccountDialog: true }); }}>
                                Create an account</button> |
                            <button type="button" className="btn btn-link login-link" onClick={() => { this.setState({ showResetPasswordDialog: true }); }}>
                                Reset your password</button>
                        </p>
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
                    {this.state.showCreateAccountDialog ?
                        <CreateAccountDialog
                            newAccountCreated={this.newAccountCreated}
                            cancelCreateAccount={this.cancelCreateAccount} /> : null}
                    {this.state.showResetPasswordDialog ?
                        <ResetPasswordDialog
                            resetPasswordSuccess={this.resetPasswordSuccess}
                            cancelCreateAccount={this.cancelCreateAccount} /> : null}
                </center>
            </div>
        )
    }
}

export default LoginPage;
