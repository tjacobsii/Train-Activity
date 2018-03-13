var config = {
    apiKey: "AIzaSyDRtZyqyHx49b2AzVmcTY9X4RvxnWfmjIg",
    authDomain: "train-scheduler-83614.firebaseapp.com",
    databaseURL: "https://train-scheduler-83614.firebaseio.com",
    projectId: "train-scheduler-83614",
    storageBucket: "",
    messagingSenderId: "463470975101"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainData = firebase.database();
$(".btn-primary").on("click", function(event){
    event.preventDefault();
    var trainName = $(".tdTrainName").val();
    var destination = $(".tdDestination").val();
    var firstTrain = moment($(".tdFirstTrain").val(),"HH:mm A").subtract(1,"year").format("X");
    var frequency = $(".tdFrequency").val();


    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("New Train has been Added!")

    $(".tdTrainName").text("");
    $(".tdDestination").text("");
    $(".tdFirstTrain").text("");
    $(".tdFrequency").text("");

    return false;
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("HH:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tbody").append
    ("<tr><td>" + name + "</tr></td>" + 
    destination + "</tr></td>" + 
    frequency + "</tr></td>" + 
    arrival + "</tr></td>" + 
    minutes + "</tr></td>"); 
});





