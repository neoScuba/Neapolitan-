//============================= FUNCTIONS =========================================
//------ ocdid2CandidateList: uses ocdid to make civic api request, returns repList
function address2CandidateList(address){
    $.ajax({
        url: "https://www.googleapis.com/civicinfo/v2/representatives?"+"address="+address+"&key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4",
        method: 'GET',
    }).done(function (response) {
        displayReps(response);
        $("#notification").text("");
    }).fail(function (response) {
        $("#notification").text("Invalid Address");
    })
};

//------ displayRepList: turns list items {repObj} to buttons and appends to buttonDiv
function displayReps(apiResponse){
    $("#candidateListId").empty();
    var offices = apiResponse.offices;
    for (var officeIndex=0; officeIndex<offices.length; officeIndex++){
        var office = offices[officeIndex];
        var newDiv = $("<div></div>");
        var dropDownId = officeName2Id(office.name);
        var dropDownContent = $("<ul class='dropdowncontent'></ul>");
        dropDownContent.attr("id",dropDownId);

        var dropDownHead = $("<button class='dropdownbutton btn' data-show=0></button>");
        dropDownHead.text(office.name);
        dropDownHead.attr("data-activates", dropDownId);

        for (officialIndex = 0; officialIndex<office.officialIndices.length; officialIndex++){
            var officialObj = apiResponse.officials[office.officialIndices[officialIndex]];
            var official = $("<li>");
            var link = $("<a href='#' target='iframe_a' class='repLink'></a>");
            $(link).text(officialObj.name);
            $(official).append(link);
            $(dropDownContent).append(official);
        }
        $(dropDownContent).hide();
        $(newDiv).append(dropDownHead);
        $(newDiv).append(dropDownContent);
        $("#candidateListId").append(newDiv);
    }
};

//------ wikiSearch: display wiki results of person clicked in iframe
function wikiSearch(searchTerm){
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + "&format=json&callback=?",
        type: 'GET',
        dataType: 'json',
        async:false,
    })
    .done(function(response) {
        $("#wikiContent").attr('src', response[3][0]);
    })
};

//------ HELPER FUNCTIONS
function officeName2Id(name){
    var id = name.trim().replace(/ /g,"_") + "_DropDown";
    return id;
};

function userInput2Address (state, city, zip, street){
    var address = street.trim()+"%20"+zip.trim()+"%20"+city.trim()+"%20"+state.trim();
    var address2 = address.replace(/ /g, "%20");
    return address2;
};

//============================= ON.CLICK CALLS =========================================
//-------- Process User Input --------------------------------
$("#submitBtn").on("click", function () {
    var state  = $("#stateId").val().trim();
    var city   = $("#cityId").val().trim();
    var zip    = $("#zipId").val().trim();
    var street = $("#streetId").val().trim();
    var address = userInput2Address(state,city,zip,street);
    address2CandidateList(address);
});

//-------- DropDown Mechanic --------------------------------
$(document).on("click",".dropdownbutton",function(){
    if (!$(this).data("data-show")){
        $("#"+officeName2Id($(this).text())).show();
        $(this).data("data-show",1);
    }
    else{
        $("#"+officeName2Id($(this).text())).hide();        
        $(this).data("data-show",0);
    }
});

//-------- display Wiki Results of person clicked --------------------------------
$(document).on("click",".repLink",function(){
    wikiSearch($(this).text());
});