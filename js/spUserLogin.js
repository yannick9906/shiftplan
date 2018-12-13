var usernameField = $("#username");
var passwordField = $("#password");

function doLogin() {
    let username = usernameField.val();
    let password = passwordField.val();
    let passwdHash = md5(password);

    $("#loginFields").fadeOut(500, function() {
        $("#loading").fadeIn(500);
        console.log("Try to log you in...");
        $.getJSON("backend/api/user/checkUserName.php?username=" + username, null, function (json) {
            if (json["exists"] == 1) {
                $.getJSON("backend/api/user/userLogin.php?username=" + username + "&passhash=" + passwdHash, null, function (json2) {
                    if (json2["success"] == 1) {
                        $("#loading").fadeOut(250, () => {
                            $("#success").fadeIn(250, () => {
                                $("#spContentLogin").fadeOut(500,() => {
                                    let spHomeElem = $("#spContent");
                                    spContent(spHomeElem);
                                })
                            })
                        });
                    } else {
                        M.toast({html: "Kennwort falsch", duration: 2000, classes: "red"});
                        passwordField.removeClass("valid");
                        passwordField.addClass("invalid");
                        $("#loading").fadeOut(500, () => {
                            $("#loginFields").fadeIn(500);
                        });
                    }
                })
            } else {
                M.toast({html: "Benutzername falsch", duration: 2000, classes: "red"});
                usernameField.removeClass("valid");
                usernameField.addClass("invalid");
                $("#loading").fadeOut(500, () => {
                    $("#loginFields").fadeIn(500);
                });
            }
        });
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