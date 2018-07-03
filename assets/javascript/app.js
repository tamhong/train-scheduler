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

  var now = moment().format('h:mm');
  
  console.log(now);

  $("#add-train").on("click", function (event) {
      event.preventDefault();

      var train = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var time = moment($("#train-time").val().trim(), "h:mm").format("LT");
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

    console.log(childSnapshot.val());

    console.log(train);
    console.log(destination);
    console.log(time);
    console.log(freq);

    $(".table tbody").append(
        "<tr><td>" + train + "</td>"
        +"<td>" + destination + "</td>"
        +"<td>" + freq + "</td>"
        +"<td></td>"
        +"<td></td>"
        +"</tr>"
    );
  });

