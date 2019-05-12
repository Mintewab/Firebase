var config = {
    apiKey: "AIzaSyCrfmpDkMCyDh-IXTLs3zX3WVkHqeWIfGc",
    authDomain: "train-time-home-work.firebaseapp.com",
    databaseURL: "https://train-time-home-work.firebaseio.com",
    projectId: "train-time-home-work",
    storageBucket: "train-time-home-work.appspot.com",
    messagingSenderId: "870341012134",
    appId: "1:870341012134:web:4f0c30ce4966f442"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainRef = database.ref("train-data/")

var frequency = 4;
var firstTime = "08:30";
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
var currentTime = moment();
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % frequency;
var minutesAway = frequency - tRemainder;
var nextArrival = moment().add(minutesAway, "minutes");

$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var newPostRef = trainRef.push({
        "trainName": trainName,
        "destination": destination,
        "frequency": frequency,
        "minutesAway": minutesAway,
        "nextArrival": nextArrival.format("HH:mm").toString()
    });
    var childRow = '<tr class="train-data-child"> <td class="train-name">' + trainName + '</td> <td class="destination">' + destination + '</td> <td class="frequency">' + frequency + '</td> <td class="next-arrival">' + nextArrival + '</td> <td class="minutes-away">' + minutesAway + '</td></tr > '

    $("#train-data").append(childRow);
});

trainRef.on('child_added', function (data) {

});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});