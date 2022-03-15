function makeRequest(form) {
    var zip = form.zip.value;
    if (zip.length != 5 || isNaN(parseInt(zip))) {
        document.getElementById("output").innerHTML = "Enter a valid US zip code";
        return;
    }

    var req = new XMLHttpRequest();
    req.open("GET", "http://api.zippopotam.us/us/" + zip, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.responseText.length == 2) {
                document.getElementById("output").innerHTML = "Error 404 - Resource Not Found. Make sure the zip code is valid in the US";
                return;
            }
            display(req.responseText)
        };
    };

    req.send();
}

function display(json) {
    data = JSON.parse(json);
    output = document.getElementById("output");
    output.innerHTML = "";
    output.append(data.places[0]["place name"] + ", ");
    output.append(data.places[0]["state abbreviation"]);
}