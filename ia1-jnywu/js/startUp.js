//Start-up functions run when page is loaded.
//Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "aboutMeMode"; //Variable captures current UI mode

//Associative array maps modes to page titles
var modeToTitle = {
    "loginMode": "Welcome",
    "aboutMeMode": "About Me",
    "hobbiesMode": "Hobbies",
    "coursesMode": "Courses"
};

//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click", bottomBarBtnClick);
}

//Bind menuItemClick function to all elements of class menuItem
var menuItems = document.getElementsByClassName("menuItem");
for (var i = 0; i < menuItems.length; ++i) {
    menuItems[i].addEventListener("click",menuItemClick);
}

//Execute function to set start state of app
startUp();
