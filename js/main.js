$( document ).ready(function() {
	$('.advanced').hide();
	fabmoDashboard.getConfig(function(err, data) {
      if(err) {
        console.log(err);
      } 
	});  
});
  // Object to store the App configuration that we'll read from fabmo
var appConfig = {};

$( document ).ready(function() {

    // Get the machine configuration (global for the tool)
    fabmoDashboard.getConfig(function(err, data) {
      if(err) {
        console.log(err);
      } 
    });

    // Get the App configuration (specific to this app)
    fabmoDashboard.getAppConfig(function(err, data) {
        appConfig = data;
        for(key in appConfig) {
            console.info('Key "' + key + '" found in the app config with a value of ' + data[key]);
            $('#' + key).val(appConfig[key])
        }
		
		 // For Bill:
        appConfig.timesAppWasLoaded = appConfig.timesAppWasLoaded ||  0;
        appConfig.timesAppWasLoaded++;
        console.log("loaded")
		console.log("loaded")
        fabmoDashboard.notify('info', 'App has been loaded ' + appConfig.timesAppWasLoaded + ' times.');
        fabmoDashboard.setAppConfig(appConfig);
    });
}); // document.ready
//var gamelevel = appConfig.timesAppWasLoaded;

$('form').parsley().on('field:success', function() {
    // This event will fire whenever a field successfully validates.
    // 'this' will be a ParsleyField instance

    var el = this.$element;             // Get the jquery element from the ParsleyField instance
    var id = el.attr('id');             // Get the id from the jquery element
    
    // Update the saved app config with the validated value we just retrieved
    appConfig[id] = el.val();

    // Send the config back to the tool
    console.info("Sending app config: " + JSON.stringify(appConfig));
    fabmoDashboard.setAppConfig(appConfig);
});

$('.exit-modal').on('click', function (){
	$('.modal, .modal-container').fadeOut('fast');
});



$('#submit').click(function (e){
	e.preventDefault();
	e.stopPropagation();
	if ( appConfig.timesAppWasLoaded < 3){
	//gamelevel++;
	console.log(appConfig.timesAppWasLoaded);
	} else {
		 appConfig.timesAppWasLoaded = 3
		 
	}
 	levelChecker(appConfig.timesAppWasLoaded);

});

var levelChecker = function (level) {
	console.log(level);
		switch (level) {
	    case 1: 
		console.log('1');
		$('#level1tab').show();
		$('#level2tab').hide();
		$('#level3tab').hide();
		$('.Level1').show();
		$('.Level2').hide();
		$('.Level3').hide();
		break;
		case 2:
		console.log('2');
		gameplay.innerHTML = "<br>Congratulations! You have unlocked the Peeler level and now have more options for how holes will be cut <br><br>";
		$('#level1tab').hide();
		$('#level2tab').show();
		$('#level3tab').hide();
		$('.Level1').show();
		$('.Level2').show();
		$('.Level3').hide();
		break
		case 3:
		console.log('3');
		gameplay2.innerHTML = "<br>Now you're a big-old Jimmy crab! You have unlocked the Hole Pincher level and can now cut oval holes if you want. <br><br>";
		//$('#proportionX').text("Hole Width (in)");
		//$('#diameter').placeholder("Hole Width");
		$('#level1tab').hide();
		$('#level2tab').hide();
		$('#level3tab').show();
		$('.Level1').show();
		$('.Level2').show();
		$('.Level3').show();
		break;
	}
};

levelChecker(appConfig.timesAppWasLoaded);
