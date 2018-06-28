  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfPa4DIYUa73gQ9XfoqO-UUVjbEd3S6n8",
    authDomain: "traintonarnia-84e14.firebaseapp.com",
    databaseURL: "https://traintonarnia-84e14.firebaseio.com",
    projectId: "traintonarnia-84e14",
    storageBucket: "traintonarnia-84e14.appspot.com",
    messagingSenderId: "1037847930921"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  $('button:submit').on('click', function(){
      event.preventDefault();
      let trainName = $('#trainName').val().trim();
      //parsing train time to military time format("X") changes into unix
      let firstTrain = moment($('#firstTrain').val().trim(), 'HH:mm');
      let destination = $('#destination').val().trim();
      //parsing frequency into minutes
      let freq = $('#freq').val().trim();

      //setting new values into a variable for easier firebase push
      let fireVal = {
        fireName: trainName,
        fireStart: firstTrain,
        fireDestination: destination,
        fireFreq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };

      database.ref().push(fireVal);
      console.log(2);

  });
  //using grabbed values from database and adding them back into table
  //activates when a child array is added** into firebase .on('child_added)
  database.ref().on('child_added', function(snapshot){
    let snap = snapshot.val();
    
    
    //sets local values to firebase values
    tName = snap.fireName;
    tStart = snap.fireStart;
    tDestination = snap.fireDestination;
    tFreq= snap.fireFreq;
    console.log(tName);
    console.log(tDestination);
    console.log(tStart)

    //next train = (difference of time) %
    let nowUnix = moment().unix();
    console.log(nowUnix)
    
    
    
    // defining variables for table row and table head
    let $tr = $('<tr>');
    let $td = '<td>';
    
    $tr.append($td + tName + $td + tDestination + $td + tFreq + $td + "NaN" + $td + "NaN");

    $('tbody').append($tr);


  })
