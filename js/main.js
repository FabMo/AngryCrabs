$(document).ready(function() {
 // $('.advanced').hide();
  fabmo.getConfig(function(err, data) {
    if (err) {
      console.log(err);
    }
  });
});


// Object to store the App configuration that we'll read from fabmo
var appConfig = {};


var gamelevel = parseInt(localStorage.getItem('gamelevel')) || 0;

$('form').parsley().on('field:success', function() {
  // This event will fire whenever a field successfully validates.
  // 'this' will be a ParsleyField instance

  var el = this.$element; // Get the jquery element from the ParsleyField instance
  var id = el.attr('id'); // Get the id from the jquery element

  // Update the saved app config with the validated value we just retrieved
  appConfig[id] = el.val();

  // Send the config back to the tool
  console.info("Sending app config: " + JSON.stringify(appConfig));
  fabmoDashboard.setAppConfig(appConfig);
});

$('.exit-modal').on('click', function() {
  $('.modal, .modal-container').fadeOut('fast');
  gamelevel = 1;
  levelChecker(gamelevel);
});



$('#submit').click(function(e) {
  e.preventDefault();
  e.stopPropagation();
  

  if (gamelevel < 4) {
    gamelevel++;
  } else {
   gamelevel = 4
 }
  levelChecker(gamelevel);
  localStorage.setItem('gamelevel', gamelevel);
  
		//var xMax = data.machine.envelope.xmax;
		//  var yMax = data.machine.envelope.ymax;
		//  var xCenter = xMax/2;
		//  var yCenter = yMax/2;
        
  		var xCenter = 3;
		var yCenter = 4;      
		  var diameter
          if (gamelevel = 4) {
              diameter = 1
              }
              else {
                  diameter = parseFloat($('#diameter').val());   
              }
              
         
          
		  var speed = parseFloat($('#feed-rate').val());
		  var cutThrough = parseFloat($('#cut-through').val());
		  var depth = Math.abs(parseFloat($('#depth').val()));
		  var bitDiameter = parseFloat($('#bit-diameter').val());
          var proportionX = parseFloat($('#holeWidth').val());
		  console.log("proportionX = " + proportionX)
          var proportionY = parseFloat($('#holeHeight').val());
		  console.log("proportionY = " + proportionY)		  

          var pocketed
          if ($('#check-pocket').prop('checked')) {
              pocketed = "2";   
          }
          else
          {
              pocketed = "";
          }           
              

           
          if (gamelevel = 4) {
              console.log("changed")
              diameter = 1
              }
              else {
                  diameter = parseFloat($('#diameter').val());   
				 console.log("not changed") 
              }
              

		  
		  var actualDiameter = (diameter - bitDiameter);
		 // console.log(depth);
		  var depthTotal = depth + cutThrough;
		  //console.log(depthTotal);
		  var maxPlunge = bitDiameter * .75;
		  var passes = Math.ceil(depthTotal/maxPlunge);
		  //console.log(passes);
		  var plunge = (0-(depthTotal/passes)).toFixed(5);
		  var shopbotCode = ["'Simple Circle'", 
//		  "'Center: " + xCenter + "," + yCenter + "  Diameter: " + diameter + "'",
		  "'Bit Diameter: " + bitDiameter + "'",
		  "'Safe Z'",
		  "JZ, 1",
		  "'Spindle On'",
          "VC, " + bitDiameter,
		  "SO, 1,1",
		  "MS,"+speed,
		  "pause 3",
		  "CP," + actualDiameter + "," + xCenter + "," + yCenter + ",I,,,," + plunge + "," + passes + "," + proportionX + ", " + proportionY + "," + pocketed + ",,1",
		  "'Safe Z'",
		  "JZ, 1",
		  "'Spindle Off'",
		  "SO, 1,0",
		  "'Jog Home'",
		  "J2, 0,0"
		  ];
		  

       var holeCode = shopbotCode.join('\n');  
         
        fabmo.submitJob({
            file: holeCode,
            filename : 'Hole-' + diameter + 'diameter- ' + depth + ' deep.sbp',
            name : 'Holesaw',
            description : 'Cut a hole that is ' + diameter + ' in diameter',  
        });
	
  
  
  
});
gamelevel = 4;
$('#crabmo').on('click', function(){
	$('.modal-content p').html('<p>What\'s with this stupid crab? That\'s Crabmo the un-official Fabmo mascot, and this app tells his life story.</p><p>Follow along as you gain experience and Crabmo goes from a tiny crab larva to a part of someone\'s tasty crab dinner!</p>'); 
    	 $('.modal, .modal-container').fadeIn();
      $('.settings').hide();
     
});
var levelChecker = function(level) {

  switch (level) {

    case 0:
      $('.modal-content p').html(' <p>Angry Crabs is an exploration of an alternate app interface that presents you with additional interface elements as you cut jobs and gain experience, much like power-ups in video games.</p><p>When you first run an app like this, most of the options are set to default values. Each time the app is run though a new feature or set of features is added. Click the OKAY button to move to the next level in this demo, but in a real app you would power-up each time you ran the app.</p>');

	 $('.modal, .modal-container').fadeIn();
      $('.settings').hide();
      break;

    case 1:
      $('.settings').show();
      game_intro.innerHTML = "";
      gameplay1.innerHTML = "You start your life as a lowly crab larvae and can only set the diameter and depth of the hole. With experience though you'll soon have more crabby skills!  <br><br>";
      gameplay2.innerHTML = "";
      gameplay3.innerHTML = "";
      gameplay4.innerHTML = "";
      $('#level1tab').show();
      $('#level2tab').hide();
      $('#level3tab').hide();
      $('#level4tab').hide();
      $('.LevelD').show();
      $('.Level1').show();
      $('.Level2').hide();
      $('.Level3').hide();
      $('.Level4').hide();
      break;
    case 2:
      game_intro.innerHTML = "";
      gameplay1.innerHTML = "";
      gameplay2.innerHTML = "<br>Congratulations! You have unlocked the Peeler level and now have more options for how holes will be cut. <br><br>";
      gameplay3.innerHTML = "";
      gameplay4.innerHTML = "";
      $('#level1tab').hide();
      $('#level2tab').show();
      $('#level3tab').hide();
      $('#level4tab').hide();
      $('.LevelD').show();
      $('.Level1').show();
      $('.Level2').show();
      $('.Level3').hide();
      $('.Level4').hide();
      break
    case 3:
      game_intro.innerHTML = "";
      gameplay1.innerHTML = "";
      gameplay2.innerHTML = "";
      gameplay3.innerHTML = "<br>Now you're a big-old Jimmy crab! You have unlocked the Hole Pincher level and can now cut oval holes if you want. Input the X and Y axis size for the size hole you want, entering the same size in both for a plain-old round hole. <br><br>";
      gameplay4.innerHTML = "";
      $('#level1tab').hide();
      $('#level2tab').hide();
      $('#level3tab').show();
      $('#level4tab').hide();
      $('.Level1').show();
      $('.Level2').show();
      $('.Level3').show();
      $('.Level4').hide();
      $('.LevelD').hide();
      break;
    case 4:
      game_intro.innerHTML = "";
      gameplay1.innerHTML = "";
      gameplay2.innerHTML = "";
      gameplay3.innerHTML = "";
      gameplay4.innerHTML = "<br>I'm about to become dinner, but before they cover me in Old Bay and toss me in boiling water I have one more gift for you...the power of Pocketing. This lets you completely remove the center plug of a thru-cut hole, or to cut a pocket. Use your new power wisely. <br><br>";
      $('#level1tab').hide();
      $('#level2tab').hide();
      $('#level3tab').hide();
      $('#level4tab').show();
      $('.Level1').show();
      $('.Level2').show();
      $('.Level3').show();
      $('.Level4').show();
      $('.LevelD').hide();
	  
      break;
  }
};
levelChecker(gamelevel);
