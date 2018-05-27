var apiKey = "AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4";
var baseUrl = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address="
//https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBB5fWaIK-L-cV2wNpc2G2cQRBtQlRR4B4&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000   
// ocd-division/country:us/state:nc/county:wake
//http://maps.googleapis.com/maps/api/geocode/json?address=92612&sensor=true
$("#submitBtn").on("click", function () {
    var zip = $("#zipId").val().trim();
    var ocid = zip2Ocid(zip);
    // var candidateList = ocid2CandidateList(ocid);
});

function zip2Ocid (potentialZip){
        if (potentialZip.length == 5 && !isNaN(potentialZip)){
            $.ajax({
                url: "http://maps.googleapis.com/maps/api/geocode/json?address="+potentialZip+"&sensor=true",
                method: 'GET',
            }).done(function (response) {
                console.log("zip2CityCounty::done:: Valid zip")
                console.log(response.results["0"].address_components);
            }).fail(function (response) {
                console.log("zip2CityCounty::done:: Not valid zip");
            })
        
        }
    };
function ocid2CandidateList(ocid){

    $.ajax({
        url: Url,
        method: 'GET',
    }).done(function (response) {
        console.log("ocid2CandidateList::ajax::done")
        console.log(response);
    }).fail(function (response) {
        console.log("ocid2CandidateList::ajax::fail");
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
