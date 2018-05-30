var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var dropdownDiv = "#candidateListId";

//-------------------------FUNCTIONS-------------------------

//------ ocdid2CandidateList: uses ocdid to make civic api request, returns repList
function address2CandidateList(state, city, zip, street){
    var result;
    var address = street.trim()+"%20"+zip.trim()+"%20"+city.trim()+"%20"+state.trim();
    var address2 = address.replace(" ", "%20");
    $.ajax({
        url: "https://www.googleapis.com/civicinfo/v2/representatives?"+"address="+address2+"&key="+apiKey,
        method: 'GET',
        async:false,
    }).done(function (response) {
        console.log("ocdid2CandidateList::ajax::done::Valid Ocdid");
        result = response;
    }).fail(function (response) {
        console.log("ocdid2CandidateList::ajax::fail::Invalid Ocdid");
    })
    return result;
};

//------ displayRepList: turns list items {repObj} to buttons and appends to buttonDiv
function displayReps(apiResponse){
    var offices = apiResponse.offices;
        
    for (var officeIndex=0; officeIndex<offices.length; officeIndex++){
        var office = offices[officeIndex];

        var dropDownId = office.name.trim().replace(" ","_") + "_DropDown";
        var dropDown = $("<ol calss='dropdown-content'></ol>");
        dropDown.attr("id",dropDownId);

        var officeHead = $("<a class='dropdown-trigger btn' data-target='dropdown1'></a>");
        officeHead.text(office.name);
        officeHead.attr("data-target", dropDownId);

        for (officialIndex = 0; officialIndex<office.officialIndices.length; officialIndex++){
            var officialObj = apiResponse.officials[office.officialIndices[officialIndex]];
            var official = $("<li>");
            official.text(office.name)
            $(dropDown).append(official);
        }
        $(dropdownDiv).append(officeHead);
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
    var apiResponse = address2CandidateList(state, city, zip, street);
    console.log(apiResponse);
    displayReps(apiResponse);
});

$(document).on("click",".dropdown-trigger",function(){
    $(this).dropDown();
});
wikiSearch("pie");

