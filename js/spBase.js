/**
 * Pre Login Template
 */
let itemPreLoginContentTemplate = Handlebars.compile(`
    <div class="row">
        <form class="col s12">
            <div class="card yellow darken-1">
                <div class="card-content">
                    <span class="card-title">Login</span>
                    <hr>
                    <div class="row">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input placeholder="E-Mailaddresse" id="email" type="email" class="validate">
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">vpn_key</i>
                            <input placeholder="Passwort" id="password" type="password" class="validate">
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn waves-effect waves-light yellow darken-2 col s5" id="btnSubmit" type="submit" name="action">Submit
                            <i class="material-icons right">send</i>
                        </button>
                        <button class="btn waves-effect waves-light yellow darken-2 col s5" id="btnReset" type="reset" name="reset">Reset
                            <i class="material-icons right">backspace</i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
`);

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
                <a class="red-text" href="#l#{{sID}}">Login</a>
                <a class="red-text" href="#s#{{sID}}">Schichtplan</a>
            </div>
        </div>
    </div>
`);

function spContent() {
    document.title ="Home - Shell|Paolo Vicentini - Schichtplan";
    let spHomeElem = $("#spContent");
    spHomeElem.show();

    $.post("backend/api/stationsList.php", null, (data) => {
        //console.log(data);
        spHomeElem.append(itemPreLoginContentTemplate);
        let stations = JSON.parse(data);
        let widths = [6, 6, 6, 6];

        for (let i = 0; i < stations.length; i++) {
            stations[i].width = widths[i];
            //spHomeElem.append(itemAfterLoginContentTemplate(stations[i]))
        }

    });
}

$(document).ready(() => {
    $("spContent").html("");
    spContent();
    M.AutoInit();
});