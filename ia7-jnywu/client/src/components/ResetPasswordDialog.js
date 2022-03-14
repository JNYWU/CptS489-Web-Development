import React from 'react'

class ResetPasswordDialog extends React.Component {
    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.UserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.oldPassRef = React.createRef();
        this.securQ = React.createRef();
        this.state = {
            accountName: "",
            displayName: "",
            profilePicDataURL: "",
            profilePicURL: "user.png",
            accountPassword: "",
            accountPasswordRepeat: "",
            accountSecurityQuestion: "",
            accountSecurityAnswer: "",
            oldPassword: "",
            lookUpEmail: true,
            AnswerSecurityQ: false,
            ResetPassword: false,
            UserData: ""
        };

    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {

        if (this.state.lookUpEmail == true) {
            let data = JSON.parse(localStorage.getItem(this.UserRef.current.value));
            //this.setState({UserData: this.UserRef});
            //console.log(this.UserRef.current.value);
            if (data != null) {
                //The user name is already taken
                this.UserRef.current.setCustomValidity("");
            } else {
                this.UserRef.current.setCustomValidity("This accoun did not exist, please re-enter your account.");
            }
        }
        else if (this.state.AnswerSecurityQ == true) {
            let data = JSON.parse(localStorage.getItem(this.state.accountName))
            if (this.state.accountSecurityAnswer != data.securityAnswer) {
                this.securQ.current.setCustomValidity("Wrong Security Answer! Please enter the valid answer");
            }
            else {
                this.securQ.current.setCustomValidity("");
            }
        }
        else {
            if (this.state.accountPassword != this.state.accountPasswordRepeat) {
                //Passwords don't match
                this.repeatPassRef.current.setCustomValidity(
                    "This password must match original password.");
            } else {
                this.repeatPassRef.current.setCustomValidity("");
            }
        }



    }

    //handleEditAccountChange--Called when a field in a dialog box form changes.
    handleEditAccountChange = (event) => {
        if (event.target.name === "profilePic") {
            if (event.target.value.length == 0) { //The user canceled the file selection -- set back to default
                this.setState({
                    profilePicDataURL: "",
                    profilePicURL: "user.png"
                });
            } else { //The user selected a file
                const self = this;
                const val = event.target.value;
                const reader = new FileReader();
                reader.readAsDataURL(this.profilePicRef.current.files[0]);
                reader.addEventListener("load", function () {
                    self.setState({
                        profilePicURL: "",
                        profilePicDataURL: this.result
                    });
                });
            }
        } else {
            this.setState({ [event.target.name]: event.target.value }, this.checkAccountValidity);
        }
    }

    //setDefaultDisplayName -- Triggered by onBlur() event of Email field.
    //Sets default value of display name to value entered into Email field 
    //as a courtesy.
    setDefaultDisplayName = (event) => {
        if (event.target.value.length > 0 && this.state.displayName === "") {
            this.setState({ displayName: event.target.value });
        }
    }

    //handleResetPassword -- Triggered when user clicks on "Create Account" button.
    //Custom data checking ensures user account under this email does not 
    //already exist and that the rest of the info is valid. We create a new  
    // object for user, save it to localStorage and take user to app's 
    //landing page. 
    handleResetPassword = (event) => {
        event.preventDefault();
        let data = JSON.parse(localStorage.getItem(this.state.accountName));
        //Initialize user account
        let userData = {
            displayName: data.displayName,
            password: this.state.accountPassword,
            profilePicFile: data.profilePicDataURL, //if empty, use default
            profilePicDataURL: data.profilePicDataURL,
            securityQuestion: data.securityQuestion,
            securityAnswer: data.securityAnswer,
            rounds: data.rounds,
            roundCount: data.roundCount
        };
        console.log(data)
        //Commit to local storage
        localStorage.setItem(this.state.accountName, JSON.stringify(userData));
        //Invite user to log in using new account
        this.props.resetPasswordSuccess();
    }
    handleLookUpAccount = () => {
        this.setState({ lookUpEmail: false });
        this.setState({ AnswerSecurityQ: true });
        this.setState({ ResetPassword: false });
        this.setState({ UserData: this.UserRef });
    }
    handleAnswerSecurityQ = () => {
        this.setState({ lookUpEmail: false });
        this.setState({ AnswerSecurityQ: false });
        this.setState({ ResetPassword: true });
    }

    render() {
        return (
            <div className="modal" role="dialog">
                {this.state.lookUpEmail ?
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <center>
                                    <h3 className="modal-title"><b>Look up account</b></h3>
                                </center>
                                <button className="close"
                                    onClick={this.props.cancelCreateAccount}>
                                    &times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleLookUpAccount}>
                                    <label>
                                        Email:
                                        <input
                                            className="form-control form-text form-center"
                                            name="accountName"
                                            type="email"
                                            size="35"
                                            placeholder="Enter Email Address"
                                            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                            required={true}
                                            ref={this.UserRef}
                                            value={this.state.accountName}
                                            onChange={this.handleEditAccountChange}
                                        />
                                    </label>
                                    <button role="submit"
                                        className="btn btn-primary btn-color-theme modal-submit-btn">
                                        <span className="fa fa-user-plus"></span>&nbsp;Look Up Account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> : null}
                {this.state.AnswerSecurityQ ?
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <center>
                                    <h3 className="modal-title"><b>Answer Security Question</b></h3>
                                </center>
                                <button className="close"
                                    onClick={this.props.cancelCreateAccount}>
                                    &times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleAnswerSecurityQ}>
                                    <label>
                                        Answer to Security Question:
                                        <textarea
                                            className="form-control form-text form-center"
                                            name="accountSecurityAnswer"
                                            type="text"
                                            placeholder="Answer"
                                            rows="2"
                                            cols="35"
                                            maxLength="100"
                                            required={true}
                                            ref={this.securQ}
                                            value={this.state.accountSecurityAnswer}
                                            onChange={this.handleEditAccountChange}
                                        />
                                    </label>
                                    <button role="submit"
                                        className="btn btn-primary btn-color-theme modal-submit-btn">
                                        <span className="fa fa-user-plus"></span>&nbsp;Answer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> : null}

                {this.state.ResetPassword ?
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <center>
                                    <h3 className="modal-title"><b>Reset Password</b></h3>
                                </center>
                                <button className="close"
                                    onClick={this.props.cancelCreateAccount}>
                                    &times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleResetPassword}>
                                    <label>
                                        New Password:
                                        <input
                                            className="form-control form-text form-center"
                                            name="accountPassword"
                                            type="password"
                                            size="35"
                                            placeholder="Enter Password"
                                            pattern=
                                            "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                            required={true}
                                            value={this.state.accountPassword}
                                            onChange={this.handleEditAccountChange}
                                        />
                                    </label>
                                    <label>
                                        Repeat Password:
                                        <input
                                            className="form-control form-text form-center"
                                            name="accountPasswordRepeat"
                                            type="password"
                                            size="35"
                                            placeholder="Repeat Password"
                                            required={true}
                                            ref={this.repeatPassRef}
                                            value={this.state.accountPasswordRepeat}
                                            onChange={this.handleEditAccountChange}
                                        />
                                    </label>
                                    <button role="submit"
                                        className="btn btn-primary btn-color-theme modal-submit-btn">
                                        <span className="fa fa-user-plus"></span>&nbsp;Reset Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div> : null}
                {/* <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
            <center>
            <h3 className="modal-title"><b>Reset Password</b></h3>
            </center>
            <button className="close" 
                onClick={this.props.cancelCreateAccount}>
                &times;</button>
            </div>
            <div className="modal-body">
            <form onSubmit={this.handleResetPassword}>
            <label>
                Email: 
                <input
                className="form-control form-text form-center"
                name="accountName"
                type="email"
                size="35"
                placeholder="Enter Email Address"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                required={true}
                ref={this.UserRef}
                value={this.state.accountName}
                onChange={this.handleEditAccountChange}
                onBlur={this.setDefaultDisplayName}
                />
            </label>
            <label>
                Old Password:
                <input
                className="form-control form-text form-center"
                name="oldPassword"
                type="password"
                size="35"
                placeholder="Enter Password"
                pattern=
                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                required={true}
                ref={this.oldPassRef}
                value={this.state.oldPassword}
                onChange={this.handleEditAccountChange}
                />
            </label>
            <label>
                New Password:
                <input
                className="form-control form-text form-center"
                name="accountPassword"
                type="password"
                size="35"
                placeholder="Enter Password"
                pattern=
                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                required={true}
                value={this.state.accountPassword}
                onChange={this.handleEditAccountChange}
                />
            </label>
            <label>
                Repeat Password:
                <input
                className="form-control form-text form-center"
                name="accountPasswordRepeat"
                type="password"
                size="35"
                placeholder="Repeat Password"
                required={true}
                ref={this.repeatPassRef}
                value={this.state.accountPasswordRepeat}
                onChange={this.handleEditAccountChange}
                />
            </label>
            <label>
                Answer to Security Question:
                <textarea
                className="form-control form-text form-center"
                name="accountSecurityAnswer"
                type="text"
                placeholder="Answer"
                rows="2"
                cols="35"
                maxLength="100"
                required={true}
                ref={this.securQ}
                value={this.state.accountSecurityAnswer}
                onChange={this.handleEditAccountChange}
                />
            </label>
            <br/>
            <button role="submit" 
                className="btn btn-primary btn-color-theme modal-submit-btn">
                <span className="fa fa-user-plus"></span>&nbsp;Update Password
            </button>
            </form>
            </div>
        </div>
        </div> */}
            </div>
        );
    }
}

export default ResetPasswordDialog;