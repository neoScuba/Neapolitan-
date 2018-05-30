var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var buttonDiv = "#candidateListId";

//-------------------------FUNCTIONS-------------------------

//------ zip2ocdid: if zip is valid turn it to an ocidid using map api, return ocdid
function zip2ocdid (potentialZip){
    var ocdid = false;
    if (potentialZip.length == 5 && !isNaN(potentialZip)){
        $.ajax({
            url: "http://maps.googleapis.com/maps/api/geocode/json?address="+potentialZip+"&sensor=true",
            method: 'GET',
            async:false,
        }).done(function (response) {
            console.log("zip2CityCounty::done::Valid zip")
            var locationInfo = response.results["0"].address_components;
            //we can grab the county and display it somewhere
            var country = locationInfo["4"].short_name.toLowerCase();
            var state   = locationInfo["3"].short_name.toLowerCase();
            var city  = locationInfo["1"].short_name.toLowerCase();
            ocdid = "ocd-division/country:"+country+"/state:"+state+"/place:"+city;
            ocdid = ocdid.replace(/:/g,"%3A");
            ocdid = ocdid.replace(/\//ig, "%2F");
            ocdid = ocdid.replace(" ", "_");
            $(buttonDiv).empty();
        })
    }
    return ocdid;
};

//------ ocdid2CandidateList: uses ocdid to make civic api request, returns repList
function ocdid2CandidateList(ocdid){
    var repList;
    $.ajax({
        url: "https://www.googleapis.com/civicinfo/v2/representatives/"+ocdid+"?key="+apiKey,
        method: 'GET',
        async:false,
    }).done(function (response) {
        console.log("ocdid2CandidateList::ajax::done::Valid Ocdid");
        repList = response.officials;
    }).fail(function (response) {
        console.log("ocdid2CandidateList::ajax::fail::Invalid Ocdid");
    })
    return repList;
};

//------ displayRepList: turns list items {repObj} to buttons and appends to buttonDiv
function displayRepList(repList){
    for(var repIndex = 0; repIndex < repList.length; repIndex++){
        // console.log(repList[repIndex]);
        var repBtn = makeBtn(repList[repIndex]);
        $(buttonDiv).append($(repBtn));
    }
};

//------ makeBtn: turns {repObj} to button, returns button
function makeBtn(repObject){
    // <a href="https://en.wikipedia.org/wiki/Main_Page" id="linksfromWiki" target="iframe_a">Wikipedia</a>
    var btn = $("<a>");
    $(btn).text(repObject.name);
    $(btn).attr("href","https://en.wikipedia.org/w/api.php?action=opensearch&search=" + repObject.name + "&format=json&callback=?");
    return btn;
};

//------ wikiSearch: 
function wikiSearch(searchTerm){
    $('#search').on('click', function () {
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + "&format=json&callback=?",
            type: 'GET',
            dataType: 'json',
            data: function (data, status, jqXHR) {
                console.log(data);
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
};

//-------------------------ON.CLICK CALLS--------------------

$("#submitBtn").on("click", function () {
    var zip = $("#zipId").val().trim();
    var ocdid = zip2ocdid(zip);
    var representativeList = ocdid2CandidateList(ocdid);
    displayRepList(representativeList);
});

$(".representative").on("click",function(){
    console.log("searching:" +$(this).text());
    // wikiSearch($(this).text());
});

wikiSearch("pie");