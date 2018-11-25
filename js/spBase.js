let stationData = [];
/**
 * Default Content Template
 */
let itemDefaultContentTemplate = Handlebars.compile(`
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
                <a href="#{{sID}}">Login</a>
            </div>
        </div>
    </div>
`);

function spContent() {
    document.title ="Home - Shell|Paolo Vicentini - Schichtplan";
    let spHomeElem = $("#spContent");
    spHomeElem.show();

    $.post("backend/api/stationsList.php", null, (data) => {
        console.log(data);

       let stations = JSON.parse(data);
       let widths = [6, 6, 6, 6];

       for (let i = 0; i < stations.length; i++) {
           stations[i].width = widths[i];
           spHomeElem.append(itemDefaultContentTemplate(stations[i]))
       }

    });
}

$(document).ready(() => {
    $("spContent").html("");
    spContent();
    M.AutoInit();
});