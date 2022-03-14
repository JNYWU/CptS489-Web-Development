//document click: If the user clicks anywhere in the document while the side
//menu is open, we need to close the menu, toggle the menu state, and
//re-enable all buttons/input fields on the page.
document.addEventListener("click", function (e) {
    if (document.getElementById("sideMenu").style.width == "250px") {
        //Menu is open
        if (!pageLocked) { //Change hamburger back to 'X'
            document.getElementById("menuIcon").classList.remove("fa-times");
            document.getElementById("menuIcon").classList.add("fa-bars");
        }
        document.getElementById("sideMenu").style.width = "0px"; //close menu
    }
});

//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it
document.getElementById("menuBtn").addEventListener("click", function (e) {
    if (pageLocked) { //user is clicking left arrow to exit locked page
        pageLocked = false;
        //restore hamburger icon
        document.getElementById("menuIcon").classList.remove("fa-arrow-left");
        document.getElementById("menuIcon").classList.add("fa-bars");
        //Hide current page
        let currModePages = document.getElementsByClassName(mode);
        for (var i = 0; i < currModePages.length; ++i) {
            currModePages[i].style.display = "none"; //hide
        }
        //Show main mode page
        document.getElementById(mode).style.display = "block";
        //Restore main mode page title
        document.getElementById("pageTitle").textContent = modeToTitle[mode];
        if (mode == "dataTableDiv") { //restore floating button
            document.getElementById("floatBtnDiv").style.display = "block";
        }

        e.stopPropagation();
        return;
    }
    let menuWidth = document.getElementById("sideMenu").style.width;
    if (menuWidth != "250px") { //menu is closed -- open it!
        //Change hamburger to X to open menu
        document.getElementById("menuIcon").classList.remove("fa-bars");
        document.getElementById("menuIcon").classList.add("fa-times");
        document.getElementById("sideMenu").style.width = "250px"; //open up menu
        e.stopPropagation();
    }
});

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.
document.getElementById("loginInterface").onsubmit = function (e) {
    //Start spinner:
    //Start spinner:
    document.getElementById("loginBtnIcon").classList.
        add("fas", "fa-spinner", "fa-spin");
    setTimeout(login, 200);
    e.preventDefault(); //Prevents form refresh -- the default behavior
};

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.
function login() {
    //Stop spinner
    document.getElementById("loginBtnIcon").
        classList.remove("fas", "fa-spinner", "fa-spin");
    //Restore login icon
    document.getElementById("loginBtnIcon").
        classList.add("fas", "fa-sign-in-alt");
    //Enable menu button:
    document.getElementById("menuBtn").disabled = false;
    document.getElementById("dataTableDiv").classList.add("menuItemSelected");

    //Change title bar to Accounting
    document.getElementById("pageTitle").textContent = "Accounting App";
    //Show only feed mode items
    items = document.getElementsByClassName("accountingModeItem");
    for (var i = 0; i < items.length; ++i) {
        items[i].style.display = "block";
    }

    //Hide login screen and show feed screen
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("dataTableDiv").style.display = "block";
    document.getElementById("floatBtnDiv").style.display = "block";
    //Set mode to accountingMode
    mode = "dataTableDiv";
    //Write login name of user who just logged in to localStorage
    let thisUser = document.getElementById("usernameField").value;
    localStorage.setItem("userId", thisUser);
    //Check whether we have saved data on this user:
    let data = localStorage.getItem(thisUser);
    if (data == null) {
        //No data for this user yet -- create a blank data store for this user
        localStorage.setItem(thisUser, JSON.stringify({ "date": {}, "dateCount": 0, "location": {}, "locationCount": 0, "costs": {}, "costCount": 0 }));
    } else { //There is data for this user; add it to the "Costs" table
        data = JSON.parse(data);
        for (const thisCosts in data.costs) {
            addCostToTable(data.costs[thisCosts].costNum);
        }
    }
};

//logRoundForm SUBMIT: When the user clicks the "Save" button to save a newly
//entered speedgolf reminder, we need to save it to local storage
document.getElementById("dataEntryForm").onsubmit = function (e) {
    e.preventDefault(); //We do NOT want the button to trigger a page reload!
    document.getElementById("submitDataIcon").classList.add("fas", "fa-spinner", "fa-spin");
    //Set spinner to spin for one second, after which saveRoundData will be called
    setTimeout(saveCostData, 500);
}

//addToOrUpdateRoundTable -- Helper function that adds a new reminder with unique index
//reminderIndex to the "My Rounds" table. The reminder is a "condensed view" that
//shows only the date, course and score for the reminder, together with buttons to
//view/edit the detailed reminder data and delete the reminder data.
function addToOrUpdatedataTable(add, costIndex) {
    let user = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(user));
    let costData = data.costs[costIndex]; //the cost data to add/edit
    let dataTable = document.getElementById("dataTable");
    let costRow;
    if (add) { //add new row
        //Test whether table is empty
        if (dataTable.rows[1].innerHTML.includes("colspan")) {
            //empty table! Need to remove this row before adding new one
            dataTable.deleteRow(1);
        }
        costRow = dataTable.insertRow(1); //insert new row
        costRow.id = "r-" + costIndex; //set id of this row so we can edit/delete later
    } else { //update existing row
        costRow = document.getElementById("r-" + costIndex);
    }
    //Add/update row with five cols to table
    costRow.innerHTML = "<td>" + costData.date + "</td><td>" +
        costData.location + "</td><td>" + costData.costs + "</td>" +
        "<td><button onclick='editCosts(" + costIndex + ")'><span class='fas fa-eye'>" +
        "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
        "<td><button onclick='confirmDelete(" + costIndex + ")'>" +
        "<span class='fas fa-trash'></span></button></td>";
}

//saveRoundData -- Callback function called from logRoundForm's submit handler.
//Stops the spinner and then saves the entered reminder data to local storage.
function saveCostData() {
    //Stop spinner
    document.getElementById("submitDataIcon").classList.remove("fas", "fa-spinner", "fa-spin");
    document.getElementById("submitDataIcon").classList.add("fas", "fa-plus");
    //Retrieve from localStorage this user's Costs and CostCount
    let thisUser = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(thisUser));
    //Initialize empty JavaScript object to store new or updated Cost
    let thisCosts = {}; //iniitalize empty object for this Cost
    // let temp; //temporary value for storying DOM elements as needed
    //Store the data
    thisCosts.costNum = data.costCount;
    thisCosts.date = document.getElementById("Date").value; //Cost date
    thisCosts.location = document.getElementById("Location").value;
    thisCosts.costs = document.getElementById("Costs").value;

    //Determine whether we're saving new or editing existing reminder, saving accordingly
    let submitBtnLabel = document.getElementById("submitBtnLabel").textContent;
    let addNew;
    if (submitBtnLabel == "Add Cost") {
        //Adding new Cost
        addNew = true;
        //Add 1 to costCount, setting thisRound's CostNum to that value
        thisCosts.costNum = ++(data.costCount);
        data.costs[thisCosts.costNum] = thisCosts; //add to local storage 
    } else {
        //Editing existing reminder
        addNew = false;
        //Grab index of reminder being edited from localStorage. It was set in editReminder()
        thisCosts.costNum = Number(localStorage.getItem("costIndex"));
    }
    //Add/update this reminder in associative array of reminders
    data.costs[thisCosts.costNum] = thisCosts;
    //Commit rounsd object with added/updated reminder to local storage
    localStorage.setItem(thisUser, JSON.stringify(data));
    //Go back to "My Rounds" page by programmatically clicking the menu button
    document.getElementById("menuBtn").click();
    //Clear form to ready for next use
    clearCostForm();
    // alert("clearCostForm finished");
    //Add to or update "My Rounds" table
    addToOrUpdatedataTable(addNew, thisCosts.costNum);
}

//addRoundToTable -- Helper function that adds a new reminder with unique index
//reminderIndex to the "My Rounds" table. The reminder is a summary view that
//shows only the date, course and score for the reminder, together with buttons to
//view/edit the detailed reminder data and delete the reminder data.
function addCostToTable(costIndex) {
    let user = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(user));
    let costs = data.costs;
    //Test whether table is empty
    let dataTable = document.getElementById("dataTable");
    if (dataTable.rows[1].innerHTML.includes("colspan")) {
        //empty table! Need to remove this row before adding new one
        dataTable.deleteRow(1);
    }
    //Write new row with five cols to table
    let thisCosts = dataTable.insertRow(1);
    thisCosts.id = "r-" + costIndex; //set unique id of this row so we can edit/delete later
    thisCosts.innerHTML = "<td>" + costs[costIndex].date + "</td><td>" +
        costs[costIndex].location + "</td><td>" + costs[costIndex].costs + "</td>" +
        "<td><button onclick='editCosts(" + costIndex + ")'><span class='fas fa-eye'>" +
        "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
        "<td><button onclick='confirmDelete(" + costIndex + ")'>" +
        "<span class='fas fa-trash'></span></button></td>";
}


//startUp -- This function sets up the initial state of the app: Login page is
//visible, bottom bar is invisible, all menu items invisible except sport items,
//menu button disabled, UI mode = login
function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    document.getElementById("dataTableDiv").style.display = "none";
    document.getElementById("dataEntryDiv").style.display = "none";
    document.getElementById("loginDiv").style.display = "block";
    //Clear all text from email and password fields
    document.getElementById("usernameField").value = "";
    document.getElementById("passwordField").value = "";
    //Set top bar text
    document.getElementById("pageTitle").textContent = "Accounting App";

    var accountingItems = document.getElementsByClassName("accountingModeItem");
    for (var i = 0; i < accountingItems.length; ++i) {
        accountingItems[i].style.display = "block";
    }
    //Disable menu button:
    document.getElementById("menuBtn").disabled = true;
    mode = "loginMode";
    //set the input focus to the email field of login screen
    document.getElementById("usernameField").focus();

    // //Set default date to today in Log Round Page
    // document.getElementById("Date").valueAsNumber =
    //     Date.now() - (new Date()).getTimezoneOffset() * 60000;

    document.getElementById("floatBtnDiv").style.display = "none";

}; //Startup

//clearRoundForm -- Helper function that clears out data previously entered into
//the "Log New Round" form and resets all fields to their default values
function clearCostForm() {
    document.getElementById("Date").value = "";
    // Date.now() - (new Date()).getTimezoneOffset() * 60000;
    document.getElementById("Location").value = "";
    document.getElementById("Costs").value = "";
}

//fillRoundForm -- When the user chooses to view/edit an existing reminder, we need
//to fill the reminder form with the corresponding reminder data and provide the
//option to update the data
function fillCostForm(costs) {
    document.getElementById("Date").value = costs.date;
    document.getElementById("Location").value = costs.location;
    document.getElementById("Costs").value = costs.costs;
}

//transitionToLockedPage: Take the user to a locked page that is subsidiary to
//the main mode page. The new page is identified by lockedPageId and should have
//the title lockedPageTitle. Note: Any other tweaks to the locked page (e.g., 
//changing of button labels or hiding/showing of input fields and controls) must
//be done manually before or after calling this function.
function transitionToLockedPage(lockedPageId, lockedPageTitle) {
    //Swap pages
    document.getElementById(mode).style.display = "none";
    document.getElementById(lockedPageId).style.display = "block";
    //Change page title
    document.getElementById("pageTitle").textContent = lockedPageTitle;
    //Set pageLocked to true, thus indicating that we're on a page that may only
    //be exited by clicking on the left arrow at top left
    pageLocked = true;
    //When pageLocked is true, the menu  icon is the left arrow
    document.getElementById("menuIcon").classList.remove("fa-times");
    document.getElementById("menuIcon").classList.remove("fa-bars");
    document.getElementById("menuIcon").classList.add("fa-arrow-left");
    //When pageLocked is true, the bottom bar buttons are disabled
    document.getElementById("bottomBar").classList.add("disabledButton");
}

//LOG OUT ITEM CLICK -- When the user clicks the "Log Out" button
//log them out of the app and redisplay the log in screen
document.getElementById("logoutItem").onclick = function () {
    startUp();
};

//addCosts
function addCosts() {
    //Swap pages:
    document.getElementById("dataTableDiv").style.display = "none";
    document.getElementById("dataEntryDiv").style.display = "block";
    //Hide floating button:
    document.getElementById("floatBtnDiv").style.display = "none";
    //Change page title, submit button title and icon
    document.getElementById("pageTitle").textContent = "Add Costs";
    document.getElementById("submitDataIcon").classList.remove("fa-edit");
    document.getElementById("submitDataIcon").classList.add("fa-plus");
    document.getElementById("submitBtnLabel").textContent = "Add Cost";
    //Set pageLocked to true, thus indicating that we're on a page that may only
    //be exited by clicking on the left arrow at top left
    pageLocked = true;
    //When pageLocked is true, the menu  icon is the left arrow
    document.getElementById("menuIcon").classList.remove("fa-times");
    document.getElementById("menuIcon").classList.remove("fa-bars");
    document.getElementById("menuIcon").classList.add("fa-arrow-left");
}

//editReminder: Event handler called when "View/Edit" button clicked in "My Rounds"
//table. reminderIndex indicates the index of the reminder that was clicked. Grab
//the reminder data from local storage, fill it into the edit form and transition
//to the view/edit reminder page.
function editCosts(costIndex) {
    //Grab appropriate reminder to view/edit from localStorage
    let user = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(user));

    //Pre-populate form with reminder data
    fillCostForm(data.costs[costIndex]);

    //Set local storage var to index of reminder being edited. This will allow us to
    //save updated data to correct reminder when the user clicks "Update Round Data"
    localStorage.setItem("costIndex", costIndex);

    //Transition to reminder view/edit page with "Update" label for form submit button
    document.getElementById("submitDataIcon").classList.remove("fa-plus");
    document.getElementById("submitDataIcon").classList.add("fa-edit");
    document.getElementById("floatBtnDiv").style.display = "none";
    document.getElementById("submitBtnLabel").textContent = "Update Costs";
    transitionToLockedPage("dataEntryDiv", "View/Edit Costs");
}

//confrimDelete: Event handler that active when user tries to delete a chosen reminder using delete button.
function confirmDelete(costIndex) {
    let user = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(user));

    //Pop-up dialog for confirming deletion
    var txt;
    if (confirm("Do you want to delete this data?")) { //The case of deleting
        txt = "Data deleted!";
        localStorage.setItem("costIndex", costIndex);
        delete data.costs[costIndex]; //delete localStorage data
        localStorage.setItem(user, JSON.stringify(data));

        //Delete and update "My Rounds" table
        deleteReminderFromTable(costIndex);
        //Go back to "My Rounds" page by programmatically clicking the menu button
        document.getElementById("menuBtn").click();
        //Clear form to ready for next use
        clearReminderForm();
    } else { // The case of not deleting
        txt = "Deletion Canceled!";
    }
    alert(txt);
}

//deleteRoundFromTable: Deleting correlated rows from table
function deleteCostFromTable(costIndex) {
    let user = localStorage.getItem("userId");
    let data = JSON.parse(localStorage.getItem(user));
    let costData = data.costs[costIndex]; //the reminder data to add/edit
    let dataTable = document.getElementById("dataTable");
    let costRow;

    // rowIndex would be the Id we assign in the previous steop.
    var rowID = document.getElementById("r-" + costIndex);
    dataTable.deleteRow(rowID.rowIndex);

}