/**
 * Default Header template
 */
let itemDefaultHeaderContent = Handlebars.compile(`
    <div class="navbar-fixed">
        <nav class="yellow darken-1">
            <div class="container">
                <div class="nav-wrapper">
                    <a class="page-title" id="shellSpace">Shell|Paolo Vicentini - Schichtplan</a>
                    <div id="shellSpaceR"></div>
                </div>
            </div>
        </nav>
    </div>
    <div class="container" id="spBreadCrumb"></div>
`);

/**
 * Default BreadCrumb
 */
let itemDefaultBreadCrump = Handlebars.compile(`
    <nav class="yellow darken-1">
        <div class="nav-wrapper">
            <div class="col s12">
                <a href="/" class="breadcrumb">Home</a>
            </div>
        </div>
    </nav>
`);

function spDefaultHeader() {
    let spNavElem = $("#spHeader");
    spNavElem.show();
    spNavElem.append(itemDefaultHeaderContent);
}

function spDefaultBreadCrumb() {
    let spBCItem = $("#spBreadCrumb");
    spBCItem.show();
    spBCItem.append(itemDefaultBreadCrump);
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
    $("spHeader").html("");
    spDefaultHeader();
    spDefaultBreadCrumb()
    showTime();
    M.AutoInit();
});