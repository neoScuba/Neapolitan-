var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var buttonDiv = "#candidateListId";
var repBtnClass = "representative";

//-------------------------FUNCTIONS-------------------------

//------ ocdid2CandidateList: uses ocdid to make civic api request, returns repList
function ocdid2CandidateList(state, city, zip, street){
    var repList;
    var address = street.trim()+"%20"+zip.trim()+"%20"+city.trim()+"%20"+state.trim();
    var address2 = address.replace(" ", "%20");
    $.ajax({
        url: "https://www.googleapis.com/civicinfo/v2/representatives?"+"address="+address2+"&key="+apiKey,
        method: 'GET',
        async:false,
    }).done(function (response) {
        console.log(response);
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
    var btn = $("<button type='button'></button>");
    $(btn).text(repObject.name);
    $(btn).addClass(repBtnClass);
    // $(btn).attr("class","representative");
    return btn;
};

//------ wikiSearch: 
function wikiSearch(searchTerm){
    console.log("in wikiSearch with term:" + searchTerm);
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
};

//-------------------------ON.CLICK CALLS--------------------

$("#submitBtn").on("click", function () {
    var state = $("#stateId").val().trim();
    var city = $("#cityId").val().trim();
    var zip = $("#zipId").val().trim();
    var street = $("#streetId").val().trim();
    var representativeList = ocdid2CandidateList(state, city, zip, street);
    console.log(representativeList);
    // displayRepList(representativeList);
});

// $("."+repBtnClass).on("click", function () {
//     console.log("button pressed!");
// });

$(document).on("click", "."+repBtnClass, function() {
    console.log("button pressed!");
});
wikiSearch("pie");