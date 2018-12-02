/**
 * Default Header template
 */
let itemDefaultHeaderContent = Handlebars.compile(`
    <div class="navbar-fixed">
        <nav class="yellow darken-1">
            <div class="container">
                <div class="nav-wrapper">
                    <a class="page-title black-text" id="shellSpace">Shell|Paolo Vicentini - Schichtplan</a>
                    <div class="black-text" id="shellSpaceR"></div>
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
                <a href="/" class="breadcrumb black-text">Home</a>
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

    document.getElementById("shellSpaceR").innerText = date.toDateString()+"|"+date.toLocaleTimeString();
    document.getElementById("shellSpaceR").textContent = date.toDateString()+"|"+date.toLocaleTimeString();

    setTimeout(showTime, 1000);
}

$(document).ready(() => {
    $("spHeader").html("");
    spDefaultHeader();
    spDefaultBreadCrumb()
    showTime();
    M.AutoInit();
});