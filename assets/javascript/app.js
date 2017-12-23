// Firebase Link
  var config = {
    apiKey: "AIzaSyDQ_5nHrkzgJamOYSsiCIU_zdagaiABDJk",
    authDomain: "andy-wiens-code-bootcamp.firebaseapp.com",
    databaseURL: "https://andy-wiens-code-bootcamp.firebaseio.com",
    projectId: "andy-wiens-code-bootcamp",
    storageBucket: "andy-wiens-code-bootcamp.appspot.com",
    messagingSenderId: "382885857185"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabs input from site/ user
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  // Creates local temporary object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads data to the database
  database.ref().push(newTrain);

  // Logs to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // log Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  // define the train start
  var trainStartFormat = moment.unix(firstTrain).format("HH:mm");

    var firstTimeConverted = moment(firstTrain, "X").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + trainStartFormat + "</td><td>" + tMinutesTillTrain + "</td><td>" );
});