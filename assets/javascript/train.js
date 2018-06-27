
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDnhFRMt1ERHgbyAoo2zHC5VrTH5rl5TDM",
    authDomain: "timesheet-15e9e.firebaseapp.com",
    databaseURL: "https://timesheet-15e9e.firebaseio.com",
    projectId: "timesheet-15e9e",
    storageBucket: "timesheet-15e9e.appspot.com",
    messagingSenderId: "404480687023"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  $('button:submit').on('click', function(){
      event.preventDefault();
      let name = $('#emName').val().trim();
      let start = moment($('#start').val().trim(), 'DD-MM-YY').format('X');
      let position = $('#position').val().trim();
      let rate = $('#rate').val().trim();

      database.ref().push({
        name: name,
        start: start,
        position: position,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      })
      console.log(2);

  });
  //using grabbed values from database and adding them back into table
  //activates when a child array is added** into firebase .on('child_added)
  database.ref().on('child_added', function(snapshot){
    let snap = snapshot.val();
    
    
    //sets local values to firebase values
    empName = snap.name;
    empStart = snap.start;
    empPosition = snap.position;
    empRate= snap.rate;
    console.log(empName);
    console.log(empStart);

    //calculating amount billed based on months worked 
    let timeFormat = "DD/MM/YY"
    let startDate = moment(empStart, timeFormat);
    let today = moment().format(timeFormat);
    let timePassed= moment().diff(moment(empStart,'X'), 'months' );

    
    // 
    console.log(timePassed);
    // console.log(secondsPassed + 'seconds')
    

    //added items into table body
    
    //defining variables for table row and table head
    let $tr = $('<tr>');
    let $td = '<td>';
    
    $tr.append($td + empName + $td + empPosition + $td + empStart + $td + "NaN" + $td + empRate + $td + "NaN");

    $('tbody').append($tr);


  })
