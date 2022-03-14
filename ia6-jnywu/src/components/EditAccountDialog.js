import React from 'react';

class EditAccountDialog extends React.Component {

    constructor() {
        super();
        //Create a ref for the email input DOM element
        this.newUserRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.profilePicRef = React.createRef();
        this.PassRef = React.createRef();
        this.securQ = React.createRef();
        this.state = {
            accountName: "",
            displayName: "",
            profilePicDataURL: "",
            profilePicURL: "user.png",
            accountPassword: "",
            accountPasswordRepeat: "",
            accountSecurityQuestion: "",
            accountSecurityAnswer: ""
        };

    }

    //checkAccountValidity -- Callback function invoked after a form element in
    //the 'Create Account' dialog box changes and component state has been
    //updated. We need to check whether the passwords match. If they do not, 
    //we set a custom validity message to be displayed when the user clicks the
    //'Create Account' button. Otherwise, we reset the custom validity message
    //to empty so that it will NOT fire when the user clicks 'Create Account'.
    checkAccountValidity = () => {
        if (this.state.accountPassword != this.state.accountPasswordRepeat) {
            //Passwords don't match
            this.repeatPassRef.current.setCustomValidity(
                "This password must match original password.");
        } else {
            this.repeatPassRef.current.setCustomValidity("");
        }
        let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        if (data != null) {
            //The user name is already taken
            console.log(data);
            this.newUserRef.current.setCustomValidity("");
            if (data.password != this.state.accountPassword) {
                this.PassRef.current.setCustomValidity("Password incorrect.");
            }
            else {
                this.PassRef.current.setCustomValidity("");
            }
            if (this.state.accountSecurityAnswer != data.securityAnswer) {
                this.securQ.current.setCustomValidity("Wrong Security Answer!");
            }
            else {
                this.securQ.current.setCustomValidity("");
            }
        } else {
            this.newUserRef.current.setCustomValidity("An account already exists under this email address. " +
                "Use 'Reset password' to recover the password.");
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

    //handleEditAccount -- Triggered when user clicks on "Create Account" button.
    //Custom data checking ensures user account under this email does not 
    //already exist and that the rest of the info is valid. We create a new  
    // object for user, save it to localStorage and take user to app's 
    //landing page. 
    handleEditAccount = (event) => {
        event.preventDefault();
        let data = JSON.parse(localStorage.getItem(this.newUserRef.current.value));
        //Initialize user account
        let userData = {
            displayName: this.state.displayName,
            password: data.password,
            profilePicFile: this.state.profilePicFile, //if empty, use default
            profilePicDataURL: this.state.profilePicDataURL,
            securityQuestion: data.securityQuestion,
            securityAnswer: data.securityAnswer,
            rounds: data.rounds,
            roundCount: data.roundCount
        };
        //Commit to local storage
        localStorage.setItem(this.state.accountName, JSON.stringify(userData));
        //Invite user to log in using new account
        this.props.successEditAccount();
    }

    render() {
        return (
            <div>
                <center>
                    <div className="modal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <center>
                                        <h3 className="modal-title"><b>Edit Account</b></h3>
                                    </center>
                                    <button className="close"
                                        onClick={this.props.cancelEditAccount}>
                                        &times;</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleEditAccount}>
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
                                                ref={this.newUserRef}
                                                value={this.state.accountName}
                                                onChange={this.handleEditAccountChange}
                                                onBlur={this.setDefaultDisplayName}
                                            />
                                        </label>
                                        <label>
                                            Password:
                                            <input
                                                className="form-control form-text form-center"
                                                name="accountPassword"
                                                type="password"
                                                size="35"
                                                placeholder="Enter Password"
                                                pattern=
                                                "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                                required={true}
                                                ref={this.PassRef}
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
                                            Display Name:
                                            <input
                                                className="form-control form-text form-center"
                                                name="displayName"
                                                type="text"
                                                size="30"
                                                placeholder="Display Name"
                                                required={true}
                                                value={this.state.displayName}
                                                onChange={this.handleEditAccountChange}
                                            />
                                        </label>
                                        <label>
                                            Profile Picture:<br />
                                            <input
                                                className="form-control form-text form-center"
                                                name="profilePic"
                                                type="file"
                                                accept="image/x-png,image/gif,image/jpeg"
                                                ref={this.profilePicRef}
                                                value={this.state.profilePic}
                                                onChange={this.handleEditAccountChange}
                                            />
                                            <img src={this.state.profilePicURL != "" ?
                                                this.state.profilePicURL :
                                                this.state.profilePicDataURL}
                                                height="60" width="60" />
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
                                        <br />
                                        <button role="submit"
                                            className="btn btn-primary btn-color-theme modal-edit-btn">
                                            <span className="fa fa-user-plus"></span>&nbsp;Update Account Info
                                        </button>
                                        <button role="submit" className="btn btn-primary btn-color-theme modal-delete-btn">
                                            <span className="fa fa-times"></span>&nbsp;Delete Account
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}

export default EditAccountDialog;