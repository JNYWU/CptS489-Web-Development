import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
//import FloatingButton from './FloatingButton.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js"
// import FeedPage from './FeedPage.js';
import Rounds from './Rounds.js';
// import CoursesPage from './CoursesPage.js';
import EditAccountDialog from './EditAccountDialog.js';
import AboutBox from './AboutBox.js';
import Mode2 from './Mode2.js';

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Accounting App";
// modeTitle[AppMode.FEED] = "Activity Feed";
modeTitle[AppMode.ROUNDS] = "My Spendings";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Record New Costs";
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Costs";
// modeTitle[AppMode.COURSES] = "Courses";
modeTitle[AppMode.MODE2] = "Coming Soon!"

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
// modeToPage[AppMode.FEED] = FeedPage;
modeToPage[AppMode.ROUNDS] = Rounds;
modeToPage[AppMode.ROUNDS_LOGROUND] = Rounds;
modeToPage[AppMode.ROUNDS_EDITROUND] = Rounds;
// modeToPage[AppMode.COURSES] = CoursesPage;
modeToPage[AppMode.MODE2] = Mode2;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mode: AppMode.LOGIN,
      menuOpen: false,
      userId: "",
      showEditAccountDialog: false,
      accountUpdated: false,
      showAbout: false
    };
  }

  handleChangeMode = (newMode) => {
    this.setState({ mode: newMode });
  }

  openMenu = () => {
    this.setState({ menuOpen: true });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  setUserId = (Id) => {
    this.setState({ userId: Id });
    this.setUserDisplayName(Id);
  }

  setUserDisplayName = (Id) => {
    let thisUser = Id;
    let data = JSON.parse(localStorage.getItem(thisUser));
    this.setState({ userData: data });
  }

  showEditAccount = () => {
    this.setState({ showEditAccountDialog: true });
    console.log(this.state.showEditAccountDialog)
  }

  cancelEditAccount = () => {
    this.setState({ showEditAccountDialog: false });
  }

  successEditAccount = () => {
    this.setState({ showEditAccountDialog: false });
    this.setState({ accountUpdated: true });
    alert("Update account info success!")
  }

  openRoundsForm = () => {
    this.setState({ mode: AppMode.ROUNDS_LOGROUND });
  }
  closeAboutDialog = () => {
    this.setState({ showAbout: false });
  }
  showAboutDialog = () => {
    this.setState({ showAbout: true });
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div>
        {this.state.showAbout == true ? <AboutBox closeAbout={this.closeAboutDialog} /> : null}
        <NavBar
          title={modeTitle[this.state.mode]}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen} />
        <SideMenu
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          toggleMenuOpen={this.toggleMenuOpen}
          userId={this.state.userId}
          showAbout={this.showAboutDialog}
          openRoundsForm={this.openRoundsForm}
          logOut={this.handleChangeMode} />
        <ModeBar
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          disableNavBar={this.state.disableNavBar} />
        <ModePage
          menuOpen={this.state.menuOpen}
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          userId={this.state.userId}
          setUserId={this.setUserId} />
        <center>
          {this.state.showEditAccountDialog ?
            <EditAccountDialog
              cancelEditAccount={this.cancelEditAccount}
              successEditAccount={this.successEditAccount}
            /> : null}
        </center>
      </div>
    );
  }
}

export default App;