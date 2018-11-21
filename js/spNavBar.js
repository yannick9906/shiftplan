/***
 * Main Template - Navbar
 */
let itemActiveNavTemplate = Handlebars.compile(`
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper yellow darken-1">
                <a class="sidenav-trigger" id="backbutton" onclick="window.history.go(-1)" style="display:none;">
                    <i class="material-icons mddi mddi-arrow-left"></i>
                </a>
                <a href="/" class="brand-logo hide-on-med-and-down" id="shellSpace" onclick="$('html', 'body').animate({scrollTop: 0}, 'fast');">Shell|Paolo Vicentini - Schichtplan - Station: {{sName}} </a>
                <div class="right-aligned hide-on-med-and-down" id="shellSpaceR" onclick="$('html', 'body').animate({scrollTop: 0}, 'fast');"></div>
            </div>
            <div class="divider black"></div>
            <div class="nav-content yellow darken-1">
                <ul class="tabs tabs-transparent" id="spNavBarItems">
                    <li class="tab disabled"><a href="/">Logout/Login</a></li>
                    <li class="tab disabled"><a href="/">Schichtplan (Station)</a></li>
                    <li class="tab disabled"><a href="/">Schichtplan (Eigener)</a></li>
                    <li class="tab disabled"><a href="/"></a></li>
                </ul>
            </div>
        </nav>
    </div>
`);

function spNav() {
    let spNavElem = $("#spNavBar");
    spNavElem.show();
    $.post('backend/api/stations.php',{sID: JSON.stringify('0eXRI5ctLp3UwV2KoGUc')}, (data) => {
        let json = JSON.parse(data);
        if (spNavElem.html() == "") {
            spNavElem.append(itemActiveNavTemplate(json));
            showTime();
        }
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
    $("spNavBar").html("");
    spNav();
    M.AutoInit();
});