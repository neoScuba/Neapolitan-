var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var dropdownDiv = "#candidateListId";

//-------------------------FUNCTIONS-------------------------

//------ ocdid2CandidateList: uses ocdid to make civic api request, returns repList
function address2CandidateList(state, city, zip, street){
    var result;
    var address = street.trim()+"%20"+zip.trim()+"%20"+city.trim()+"%20"+state.trim();
    var address2 = address.replace(/ /g, "%20");
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
        var dropDownId = office.name.trim().replace(/ /g,"_") + "_DropDown";
        var dropDownContent = $("<ul class='dropdown-content'></ul>");
        dropDownContent.attr("id",dropDownId);

        var dropDownHead = $("<a class='dropdown-button btn'></a>");
        dropDownHead.text(office.name);
        dropDownHead.attr("data-activates", dropDownId);

        for (officialIndex = 0; officialIndex<office.officialIndices.length; officialIndex++){
            var officialObj = apiResponse.officials[office.officialIndices[officialIndex]];
            var official = $("<li>");
            official.text(officialObj.name);
            $(dropDownContent).append(official);
        }
        $(dropDownHead).append(dropDownContent);
        $(dropdownDiv).append(dropDownHead);
    }
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
    displayReps(apiResponse);
});

$(document).on("click",".dropdown-button",function(){
    console.log(this);
    $(this).show();
//    $(this).dropdown();
});
