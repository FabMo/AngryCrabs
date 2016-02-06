$(document).ready(function() {
  $('.advanced').hide();
  fabmoDashboard.getConfig(function(err, data) {
    if (err) {
      console.log(err);
    }
  });
});

// Object to store the App configuration that we'll read from fabmo
var appConfig = {};

// $( document ).ready(function() {

//     // Get the machine configuration (global for the tool)
//     fabmoDashboard.getConfig(function(err, data) {
//       if(err) {
//         console.log(err);
//       } 
//     });

//     // Get the App configuration (specific to this app)
//     fabmoDashboard.getAppConfig(function(err, data) {
//         appConfig = data;
//         for(key in appConfig) {
//             console.info('Key "' + key + '" found in the app config with a value of ' + data[key]);
//             $('#' + key).val(appConfig[key])
//         }

// 		 // For Bill:
//         appConfig.timesAppWasLoaded = appConfig.timesAppWasLoaded ||  0;
//         appConfig.timesAppWasLoaded++;
//         console.log("loaded")
// 		console.log("loaded")
//         fabmoDashboard.notify('info', 'App has been loaded ' + appConfig.timesAppWasLoaded + ' times.');
//         fabmoDashboard.setAppConfig(appConfig);
//     });
// }); // document.ready




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
    gamelevel = 1
  }
  levelChecker(gamelevel);
  localStorage.setItem('gamelevel', gamelevel);
});
gamelevel = 0;
$('#crabmo').on('click', function(){
	$('.modal-content p').text('Where did this stupid crab come from? That\'s Crabmo the Fabmo crab, and this app tell his life story. Follow along as you gain experience and Crabmo goes from a larva to a part of someone\'s tasty crab dinner!'); 
    	 $('.modal, .modal-container').fadeIn();
      $('.settings').hide();
     
});
var levelChecker = function(level) {

  switch (level) {

    case 0:
      $('.modal-content p').text(' Angry Crabs is an exploration of an alternate app interface that will present you with additional interface options as you cut things and gain experience, much like power-ups in video games.\ \ \ \When you first run the app most of the options are set to default vaues, but each time the app is run a new feature or set of features is added. Click the OKAY button to move to the next level in this demo, but in a real app you would power-up by cutting.');

	 $('.modal, .modal-container').fadeIn();
      $('.settings').hide();
      break;

    case 1:
      $('.settings').show();
      game_intro.innerHTML = "";
      gameplay1.innerHTML = "<br>You start your life as a lowly crab larvae and can only set the diameter and depth of the hole. With experience though you'll soon have more crabby skills!  <br><br>";
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
