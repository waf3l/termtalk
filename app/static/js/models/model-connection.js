define(['jquery','event.socketio'],function($,io){

	var module = (function(){
		
		self = Object;

		self.session = {
			id : null,
			nick : null,
			room : 'main',
		}

		function init(){
			console.log('model.connection init');
		};

		function set_nick(nick){
			io.socket.emit('set_nick',self.session.id,nick)
		};

		function get_nick(){
			io.socket.emit('get_nick',self.session.id)
		};

		function shout(msg){
			io.socket.emit('shout',msg)
		};

		function create_room(desc,passwd){
			io.socket.emit('create_room',desc,passwd)
		};

		function join_room(name,passwd){
			io.socket.emit('join_room',name,passwd)		
		};

		function leave_room(){
			io.socket.emit('leave_room',self.session.room)			
		};

		function talk(msg) {
			io.socket.emit('talk',msg,self.session.room)		
		};

		function list_rooms(option) {
			io.socket.emit('list_rooms',option)			
		};

		init();

		return {
			"init" : init,
			"session" : self.session,
			"set_nick" : set_nick,
			"get_nick" : get_nick,
			"shout" : shout,
			"create_room" : create_room,
			"join_room" : join_room,
			"leave_room" : leave_room,
			"talk" : talk,
			"list_rooms" : list_rooms
		};

	}());

	return module;
});