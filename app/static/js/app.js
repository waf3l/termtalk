define(['jquery','ctrl.index','event.socketio'],function($,CtrlIndex, IO){	
	
	var app = (function(){

		function init(){
			console.log('app init');
			CtrlIndex;
			IO;
		};

		init();
		
		return {
			"init" : init,
		};

	}());

	return app;
	
});