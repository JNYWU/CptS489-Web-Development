//document click: If the user clicks anywhere in the document while the side
//menu is open, we need to close the menu, toggle the menu state, and
//re-enable all buttons/input fields on the page.
document.addEventListener("click", function (e) {
    if (document.getElementById("menuBtnIcon").classList.contains("fa-times")) {
        //Menu is open
        document.getElementById("menuBtnIcon").classList.
            remove("fa-times"); //Change back to hamburger when menu closed
        document.getElementById("menuBtnIcon").classList.add("fa-bars");
        document.getElementById("sideMenu").style.width = "0"; //retract menu
    }
});

//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click", function (e) {
    let menuWidth = document.getElementById("sideMenu").style.width;
    if (menuWidth != "250px") {
        //Change hamburger to X to open menu
        document.getElementById("menuBtnIcon").classList.remove("fa-bars");
        document.getElementById("menuBtnIcon").classList.add("fa-times");
        document.getElementById("sideMenu").style.width = "250px"; //open up menu
        //menuWidth = document.getElementById("sideMenu").style.width;
        menuOpen = true;
        //toggleInputDisabled(true);
        //e.stopPropagation();
    } else {
        //Change X to a hamburger to close menu
        document.getElementById("menuBtnIcon").classList.remove("fa-times");
        document.getElementById("menuBtnIcon").classList.add("fa-bars");
        document.getElementById("sideMenu").style.width = "0px"; //close up menu 

    }
    e.stopPropagation();
});

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we toggle the mode.
var bottomBarBtnClick = function () {
    var prevMode = mode;
    //Switch mode button that is highlighted
    document.getElementById(mode).classList.remove("menuItemSelected");
    mode = this.id;
    this.classList.add("menuItemSelected");
    //Change page title
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    //Swap out page content
    document.getElementById(prevMode + "Div").style.display = "none";
    document.getElementById(mode + "Div").style.display = "block";
    //Change menu items
    var oldItems = document.getElementsByClassName(prevMode + "Item");
    var newItems = document.getElementsByClassName(mode + "Item");
    for (var i = 0; i < oldItems.length; ++i) {
        oldItems[i].style.display = "none";
    }
    for (var i = 0; i < newItems.length; ++i) {
        newItems[i].style.display = "block";
    }
}

//menuItemClick -- When a button in the side menu is clicked, we show the subpage.
var menuItemClick = function () {
    var prevMode = mode;
    //Switch mode button that is highlighted
    document.getElementById(mode).classList.remove("menuItemSelected");
    mode = this.id;
    this.classList.add("menuItemSelected");
    //Change page title
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    //Swap out page content
    document.getElementById(prevMode + "Div").style.display = "none";
    document.getElementById(mode + "Div").style.display = "block";
    //Change menu items
    var oldItems = document.getElementsByClassName(prevMode + "Item");
    var newItems = document.getElementsByClassName(mode + "Item");
    for (var i = 0; i < oldItems.length; ++i) {
        oldItems[i].style.display = "none";
    }
    for (var i = 0; i < newItems.length; ++i) {
        newItems[i].style.display = "block";
    }
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "aboutMeMode" and make the necessary UI and state changes.
// document.getElementById("loginInterface").onsubmit = function (e) {
//     //Start spinner:
//     //Start spinner:
//     document.getElementById("loginBtnIcon").classList.
//         add("fas", "fa-spinner", "fa-spin");
//     setTimeout(login, 2000);
//     e.preventDefault(); //Prevents form refresh -- the default behavior
// };

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.
// function login() {
//     //Stop spinner
//     document.getElementById("loginBtnIcon").
//         classList.remove("fas", "fa-spinner", "fa-spin");
//     //Restore login icon
//     document.getElementById("loginBtnIcon").
//         classList.add("fas", "fa-sign-in-alt");
//     //Enable menu button:
//     document.getElementById("menuBtn").disabled = false;

//     //Show bottom bar buttons and highlight aboutMe mode button
//     document.getElementsByClassName("bottombar")[0].style.display = "block";
//     document.getElementById("aboutMeMode").classList.add("menuItemSelected");
//     document.getElementById("hobbiesMode").classList.remove("menuItemSelected");
//     document.getElementById("coursesMode").classList.remove("menuItemSelected");

//     //Change title bar to About Me
//     document.getElementById("topBarTitle").textContent = "About Me";
//     //Show only aboutMe mode items
//     items = document.getElementsByClassName("aboutMeModeItem");
//     for (var i = 0; i < items.length; ++i) {
//         items[i].style.display = "block";
//     }
//     //Hide other mode menu items
//     items = document.getElementsByClassName("hobbiesModeItem");
//     for (var i = 0; i < items.length; ++i) {
//         items[i].style.display = "none";
//     }
//     items = document.getElementsByClassName("coursesModeItem");
//     for (var i = 0; i < items.length; ++i) {
//         items[i].style.display = "none";
//     }
//     //Hide login screen and show About Me screen
//     document.getElementById("loginModeDiv").style.display = "none";
//     document.getElementById("aboutMeModeDiv").style.display = "block";
//     //Set mode to aboutMe
//     mode = "aboutMeMode";
// };

//startUp -- This function sets up the initial state of the app: Login page is
//visible, bottom bar is invisible, all menu items invisible except About Me items,
//menu button disabled, UI mode = login
function startUp() {
    //Hide log in page for IA#1.
    document.getElementById("aboutMeModeDiv").style.display = "block";
    document.getElementById("educationDiv").style.display = "none";
    document.getElementById("taiwanDiv").style.display = "none";

    document.getElementById("hobbiesModeDiv").style.display = "none";
    document.getElementById("appleDiv").style.display = "none";
    document.getElementById("animeDiv").style.display = "none";

    document.getElementById("coursesModeDiv").style.display = "none";
    document.getElementById("webDevDiv").style.display = "none";
    document.getElementById("dataScienceDiv").style.display = "none";

    // document.getElementById("loginModeDiv").style.display = "none";

    //Clear all text from email and password fields
    // document.getElementById("emailInput").value = "";
    // document.getElementById("passwordInput").value = "";

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "Welcome";

    //Hide the bottom bar initially
    document.getElementsByClassName("bottombar")[0].style.display = "block";
    //Hide all menu items except for About Me items:
    var feedItems = document.getElementsByClassName("aboutMeModeItem");
    var roundItems = document.getElementsByClassName("hobbiesModeItem");
    var courseItems = document.getElementsByClassName("coursesModeItem");

    for (var i = 0; i < feedItems.length; ++i) {
        feedItems[i].style.display = "block";
    }
    for (var i = 0; i < roundItems.length; ++i) {
        roundItems[i].style.display = "none";
    }
    for (var i = 0; i < courseItems.length; ++i) {
        courseItems[i].style.display = "none";
    }

    //Disable menu button:
    document.getElementById("menuBtn").disabled = false;

    mode = "aboutMeMode";

    //set the input focus to the email field of login screen
    // document.getElementById("emailInput").focus();
};

//LOG OUT ITEM CLICK -- When the user clicks the "Log Out" button
//log them out of the app and redisplay the log in screen
// document.getElementById("logoutItem").onclick = function () {
//     startUp();
// };

//ABOUT ITEM click: When the user clicks on "About", 
//launch the modal About dialog box.
document.getElementById("aboutItem").onclick = function () {
    document.getElementById("aboutModal").style.display = "block";
};

//Close About when close button or OK is clicked
document.getElementById("modalClose").onclick = function () {
    document.getElementById("aboutModal").style.display = "none";
};
document.getElementById("modalOk").onclick = function () {
    document.getElementById("aboutModal").style.display = "none";
};