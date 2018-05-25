var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var baseUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address="
//https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000   

$("#submitBtn").on("click",function(){
    var state = $("#stateId").val().trim();
    var city = $("#cityId").val().trim();
    var zip = $("#zipId").val().trim();
    var street = $("#streetId").val().trim();

    console.log(state);
    console.log(city);
    console.log(zip);
    console.log(street);
    var address = street + "%20" + state + "%20" + city + "%20" + zip;
    address = address.replace(/ /g,"%20");
    $("#stateId").val("");
    $("#cityId").val("");
    $("#zipId").val("");
    $("#streetId").val("");

    var Url = baseUrl + address;

    $.ajax({
        url: Url,
        method: 'GET',
    }).done(function (response) {
        console.log(response);
        //do stuff
    })
});

