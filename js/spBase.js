/**
 * After Login Template
 */
let itemAfterLoginContentTemplate = Handlebars.compile(`
    <div class="col s12 m{{width}}">
        <div class="card yellow darken-1">
            <div class="card-content">
                <span class="card-title">{{sName}}</span>
                <p>
                    {{sStreet}} {{sStreetNumber}}<br>
                    {{sCity}} {{sZipCode}}
                </p>
            </div>
            <div class="card-action">
                <a class="red-text" href="#s#{{sID}}">Schichtplan</a>
            </div>
        </div>
    </div>
`);

function spSiteLoad() {
    document.title ="Home - Shell|Paolo Vicentini - Schichtplan";
    let spHomeElem = $("#spContent");
    let spLoginElem = $("#spContentLogin");
    spHomeElem.show();
    spLoginElem.hide();

    $.getJSON("backend/api/user/checkUserSession.php", null , (json) => {
        if (json.success) spContent(spHomeElem);
        else spLogin();
    });
}

function spContent(spHomeElem) {
    $.post("backend/api/staions/stationsList.php", null, (data) => {
        //console.log(data);
        let stations = JSON.parse(data);
        let widths = [6, 6, 6, 6];

        for (let i = 0; i < stations.length; i++) {
            stations[i].width = widths[i];
            spHomeElem.append(itemAfterLoginContentTemplate(stations[i]))
        }
    });
}

function spLogin() {
    let spLoginElem = $("#spContentLogin");
    spLoginElem.show()
}

$(document).ready(() => {
    $("spContent").html("");
    spSiteLoad();
    M.AutoInit();
});