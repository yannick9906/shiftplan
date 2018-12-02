/***
 * Main Template - Navbar
 */
let itemActiveTemplate = Handlebars.compile(`
    <div class="footer-copyright" id="shellFooter">
        <div class="container black-text">
            &copy; 2018 - Yannick Félix und Marcel Petzold - <a class="red-text" href="#tal">Login technischer Admin</a>
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