var config = {
    apiKey: "AIzaSyDQKbPg7RJ8-EZY8ncKG9FNtCqgx7Mw5Cs",
    authDomain: "project-yore-d8dc1.firebaseapp.com",
    databaseURL: "https://project-yore-d8dc1.firebaseio.com",
    projectId: "project-yore-d8dc1",
    storageBucket: "",
    messagingSenderId: "38663053147",
    appId: "1:38663053147:web:da7686a070310b0f"
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
$("#cTime").text("Current Time:" + time)

var info = function() {
    if (($("#trainName").val() === "") || ($("#destination").val() === "") || ($("#firstTime").val() === "") || ($("#Frequency").val() === "")) {
        return null;
    }
    else {
    console.log("hi")

    event.preventDefault(); //stops page from refreshing

    //sets all inputs to vars and gets desired outputs

    var  trainName = $("#trainName").val() // train name

    var destination = $("#destination").val() // stop name
    
    var firstTime = $("#firstTime").val() // start time (millitary)

    var frequency = $("#Frequency").val() // frequency of train arrival

    // Code for the push
    dataRef.ref().push({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    }

     //clears all textboxes
     $("#trainName").val("");$("#destination").val("");$("#firstTime").val("");$("#Frequency").val("")
};

dataRef.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

    var trainInfo = $("<div>") //creates a div in memory

    var table = $("<table border = '1'>")

    var header1 = $("<tr>")

    var header2 = $("<tr>")

    //hope this works
    var  trainName = snapshot.val().trainName // train name

    var destination = snapshot.val().destination // stop name
    
    var firstTime = snapshot.val().firstTime // start time (millitary)

    var frequency = snapshot.val().frequency // frequency of train arrival

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var nextArrival = frequency - tRemainder; //minutes till next arrival
    console.log("MINUTES TILL TRAIN: " + nextArrival);

    var nextTrain = moment().add(nextArrival, "minutes"); //the time the train will arrive
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    nextTrainFormat = moment(nextTrain).format("hh:mm");
    //end works

    trainInfo.append(table)

    table.append(header1)
//for loop --- TODO
    header1.append('<th>' + "Train Name" + '</th>') // train name

    header1.append('<th>' + "Destination" + '</th>') // stop name

    header1.append('<th>' + "Frequency" + '</th>') //Frequency

    header1.append('<th>' + "Next Arrival" + '</th>') // Next time the train will arrive

    header1.append('<th>' + "Minutes away" + '</th>') // Minutes away

    table.append(header2)
//for loop --- TODO
    header2.append('<td>' + trainName + '</td>') // train name

    header2.append('<td>' + destination + '</td>') // stop name

    header2.append('<td>' + frequency + '</td>') //Frequency

    header2.append('<td>' + nextTrainFormat + '</td>') // Next time the train will arrive

    header2.append('<td>' + nextArrival + '</td>') // Minutes away

    trainInfo.addClass("trainInfo")

    $("#output").append(trainInfo)
    // Change the HTML to reflect
    // $("#name-display").text(snapshot.val().name);
    // $("#email-display").text(snapshot.val().email);
    // $("#age-display").text(snapshot.val().age);
    // $("#comment-display").text(snapshot.val().comment);
  });


$(document).on("click", "#input", info)