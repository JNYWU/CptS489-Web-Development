//Start-up functions run when page is loaded.
//Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "loginMode"; //Variable captures current UI mode

//Associative array maps modes to page titles
var modeToTitle = {"dataTableDiv": "Accounting App",
                   "loginMode": "Login to Accounting App"};

//pageLocked captures whether we're on a page that may be exited only 
//by clicking on the left arrow menu button icon
var pageLocked = false; 

//Execute function to set start state of app
startUp();
