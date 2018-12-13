/***
 * Main Template - Navbar
 */
let itemActiveTemplate = Handlebars.compile(`
    <div class="footer-copyright" id="shellFooter">
        <div class="container black-text">
            &copy; 2018 - Yannick Félix und Marcel Petzold - Made with <a class="grey-text text-darken-4" href="http://materializecss.com">Materialize</a>
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