var config = {
    apiKey: "AIzaSyC9rFB9WMNaunArxFwDjiKQIJN6dds5TjI",
    authDomain: "train-scheduler-f5bec.firebaseapp.com",
    databaseURL: "https://train-scheduler-f5bec.firebaseio.com",
    projectId: "train-scheduler-f5bec",
    storageBucket: "",
    messagingSenderId: "556964055241"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train").on("click", function (event) {
      event.preventDefault();

      var train = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var time = moment($("#train-time").val().trim(), "hh:mm").format("LT");
      var freq = $("#freq").val().trim();

      var newTrain = {
          train: train,
          destination: destination,
          time: time,
          frequency: freq,
      }

      database.ref().push(newTrain);

      console.log(newTrain.train);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

      $("#train-name").val("");
      $("#destination").val("");
      $("#train-time").val("");
      $("#freq").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var freq = childSnapshot.val().frequency;
    //Using moment to convert first train time to "moment time"
    //Subtracting 1 year to get the earliest possible start time
    var convTime = moment(time, "hh:mm").subtract(1, 'years');
    //Finding difference between earliest possible start time and current "moment time" in minutes
    var timeDif = moment().diff(moment(convTime), "minutes");
    //Taking total time difference and dividing by frequency; remainder of this is what time apart will be; modulus returns remainder--often used to determine even/odd numbers
    var timeApart = timeDif % freq;
    //Subtracting how many times train comes since initial start time from frequency to get minutes until next train
    var nextMin = freq - timeApart;
    //Adding nextMin to moment time to get next arrival time
    var nextArr = moment().add(nextMin, "m").format("LT");

    console.log("timeDif: " + timeDif);
    console.log("timeApart: " + timeApart);
    console.log("nextMin: " + nextMin);

    console.log(childSnapshot.val());

    console.log(train);
    console.log(destination);
    console.log(time);
    console.log(freq);

    $(".table tbody").append(
        "<tr><td>" + train + "</td>"
        +"<td>" + destination + "</td>"
        +"<td>" + freq + "</td>"
        +"<td>" + nextArr + "</td>"
        +"<td>" + nextMin + "</td>"
        +"</tr>"
    );
  });

