define(["jquery","socketio"],function($,io){
	var module = (function(){
		var self = Object;

		function init(){
			console.log('event.socketio init')
			connect();
		};

		function connect(){
			self.socket= io.connect('/main');
			bindEvents();
		};

		function bindEvents(){
			require(['ctrl.index'],function(CtrlIndex){
				self.socket.on('on_connect',function(msg){
					CtrlIndex.on_connect(msg);
				});

				self.socket.on('error',function(msg){
					CtrlIndex.on_error(msg);
				});

				self.socket.on('warning',function(msg){
					CtrlIndex.on_warning(msg);
				});

				self.socket.on('set_nick',function(msg){
					CtrlIndex.on_set_nick(msg);
				});

				self.socket.on('get_nick',function(msg){
					CtrlIndex.on_get_nick(msg);
				});

				self.socket.on('shout',function(msg){
					CtrlIndex.on_shout(msg);
				});

				self.socket.on('create_room',function(msg){
					CtrlIndex.on_create_room(msg);
				});

				self.socket.on('join_room',function(msg){
					CtrlIndex.on_join_room(msg);
				});

				self.socket.on('leave_room',function(msg){
					CtrlIndex.on_leave_room(msg);
				});

				self.socket.on('talk',function(msg){
					CtrlIndex.on_talk(msg);
				});

				self.socket.on('list_rooms',function(msg){
					CtrlIndex.on_list_rooms(msg);
				});

			});

		};

		init();

		return {
			"init" : init,
			"socket" : self.socket, 
		};

	}());

	return module;
});