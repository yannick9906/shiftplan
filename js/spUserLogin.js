var usernameField = $("#username");
var passwordField = $("#password");

function doLogin() {
    let username = usernameField.val();
    let password = passwordField.val();
    let passwdHash = md5(password);

    $.getJSON("backend/api/user/checkUserName.php?username=" + username, null, function (json) {
        if (json["exists"] == true) {
            $.getJSON("backend/api/user/userLogin.php?username" + username + "&passhash=" + passwdHash, null, function (json2) {
                if (json2["success"] == true) {
                    $("#spContentLogin").fadeOut(500, () => {
                        let spHomeElem = $("#spContent");
                        spHomeElem.show();
                        spContent(spHomeElem);
                    });
                } else {
                    M.toast({html: "Kennwort falsch", duration: 2000, classes: "red"});
                    passwordField.removeClass("valid");
                    passwordField.addClass("invalid");
                }
            });
        } else {
            M.toast({html: "Benutzername falsch", duration: 2000, classes: "red"});
            usernameField.removeClass("valid");
            usernameField.addClass("invalid");
        }
    });
}

function doLogout() {
    $.getJSON("backend/api/user/tryLogin.php", {logout: 1}, (json) => {
        if(json.success) {
            location.hash = "";
            M.toast({html: "Logout erfolgreich.", duration: 500});
            $("#mainPanel").hide();
            startLogin();
        } else {
            M.toast({html: "Es ist ein Fehler aufgetreten.", duration: 2000, classes: "red"});
        }
    });
}