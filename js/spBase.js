let currentUrl = location.href;
let stations = [];
/***
 * Main Template - Navbar
 */
let itemNavBar = Handlebars.compile(`
    <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper yellow darken-1">
                        <a class="sidenav-trigger" id="backbutton" onclick="window.history.go(-1)" style="display: none;">
                            <i class="material-icons mddi mddi-arrow-left"></i>
                        </a>
                        <a href="/" class="brand-logo hide-on-med-and-down" id="shellSpace" onclick="$('html', 'body').animate({scrollTop: 0}, 'fast');">Shell|Paolo Vicentini - Schichtplan| {{sName}} </a>\
                        <div class="right-aligned hide-on-med-and-down" id="shellSpaceR" onclick="$('html', 'body').animate({scrollTop: 0}, 'fast');"></div>
                    </div>
                </nav>
            </div>
    `);


function spNav() {
    document.title ="Home - Shell|Paolo Vicentini - Schichtplan";
    let spNavElem = $("#shellNav");
    $.post('backend/api/stations.php',{sID: JSON.stringify('qz9UqSHWplSM85mDNtqx')}, (data) => {
        console.log(data);
        /*let stations = JSON.parse(data);
        sName = stations.sName;
        console.log(sName);*/

        spNavElem.show();
    });

}

/***
 * Returns the current Time and the current Date
 */
function showTime() {
    let date = new Date();
    let d = date.getDay();
    let mo = date.getMonth();
    let y = date.getFullYear();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59

    d = (d <10) ? "0" + d : d;
    m = (m <10) ? "0" + m : m;
    h = (h < 10) ? "0" + h : h;
    s = (s < 10) ? "0" + s : s;

    let time = d+"."+mo+"."+y+"|"+h+":"+m+":"+s;

    document.getElementById("shellSpaceR").innerText = time;
    document.getElementById("shellSpaceR").textContent = time;

    setTimeout(showTime, 1000);
}

$(document).ready(() => {
    spNav();
    $("#shellNav").html(itemNavBar);
    showTime();
})