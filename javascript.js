var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var baseUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address="
//https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address=92612
// ocd-division/country:us/state:nc/county:wake
// https://www.googleapis.com/civicinfo/v2/representatives/ocd-division%2Fcountry%3Aus%2Fstate%3Anc%2Fcounty%3Awake?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4
//http://maps.googleapis.com/maps/api/geocode/json?address=92612&sensor=true
$("#submitBtn").on("click", function () {
    var zip = $("#zipId").val().trim();
    var ocdid = zip2ocdid(zip);
    var candidateList = ocdid2CandidateList(ocdid);
});

function zip2ocdid (potentialZip){
    var ocdid = false;
    if (potentialZip.length == 5 && !isNaN(potentialZip)){
        $.ajax({
            url: "http://maps.googleapis.com/maps/api/geocode/json?address="+potentialZip+"&sensor=true",
            method: 'GET',
            async:false,
        }).done(function (response) {
            console.log("zip2CityCounty::done:: Valid zip")
            console.log(response.results);
            var locationInfo = response.results["0"].address_components;
            var country = locationInfo["4"].short_name.toLowerCase();
            var state   = locationInfo["3"].short_name.toLowerCase();
            var city  = locationInfo["1"].short_name.toLowerCase();
            ocdid = "ocd-division/country:"+country+"/state:"+state+"/place:"+city;
            ocdid = ocdid.replace(/:/g,"%3A");
            ocdid = ocdid.replace(/\//ig, "%2F");
            ocdid = ocdid.replace(" ", "_");
            console.log(ocdid);
        })
    }
    return ocdid;
};

function ocdid2CandidateList(ocdid){
    $.ajax({
        url: "https://www.googleapis.com/civicinfo/v2/representatives/"+ocdid+"?key="+apiKey,
        method: 'GET',
        async:false,
    }).done(function (response) {
        console.log("ocdid2CandidateList::ajax::done")
        console.log(response);
    }).fail(function (response) {
        console.log("ocdid2CandidateList::ajax::fail");
    })
};






var searchTerm = "Apple";

    $('#search').on('click', function () {
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + "&format=json&callback=?";
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: function (data, status, jqXHR) {
                console.log(data)
            },

        })
        .done(function(response) {
            console.log(response);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log('complete');
        });
    });
