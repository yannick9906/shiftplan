/***
 * Main Template - Navbar
 */
let itemActiveTemplate = Handlebars.compile(`
    <div class="footer-copyright" id="shellFooter">
        <div class="container">
            &copy; 2018 - Yannick Félix und Marcel Petzold
        </div>
    </div>
`);

function spFooter() {
    let spNavElem = $("#spFooter");
    spNavElem.show();

    if (spNavElem.html() == "") {
        spNavElem.append(itemActiveTemplate);
    }
}


$(document).ready(() => {
    $("spFooter").html("");
    spFooter();
    M.AutoInit();
});