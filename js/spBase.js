/**
 * Main template - spContent
 */
let itemActivContentTemplate = Handlebars.compile(``);

function spContent() {
    document.title ="Home - Shell|Paolo Vicentini - Schichtplan";
    let spHomeElem = $("#spContent");
    spHomeElem.show();
}

$(document).ready(() => {
    $("spContent").html("");
    M.AutoInit();
});