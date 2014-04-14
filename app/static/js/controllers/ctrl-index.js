define(['jquery','view.index','model.connection'],function($,ViewIndex,ModelConn){

	var module = (function(){
		
		function init(){
			console.log('ctrl.index init');
			//view init automatiaclly 
		};

		function on_connect(msg){
			ModelConn.session.id = msg.id;
			ModelConn.session.nick = msg.nick;
			ViewIndex.responseCommand({color:'color-server-info',msg:msg.msg})
			//add setup prompt
		};

		function on_shout(msg){
			ViewIndex.responseCommand({color:'color-server-broadcast',msg:msg.msg})
		};

		function on_error(msg){
			ViewIndex.responseCommand({color:'color-server-error',msg:msg.msg})
		};

		function on_warning(msg){		
			ViewIndex.responseCommand({color:'color-server-warning',msg:msg.msg})
		};

		function on_set_nick(msg){
			if (ModelConn.session.id == msg.id){
				if (msg.nick != null){
					ModelConn.session.nick = msg.nick;
					$('.prompt').html(ModelConn.session.nick+'@'+ModelConn.session.room+'>&nbsp;');
					ViewIndex.responseCommand({color:'color-server-info',msg:msg.msg})	
				} else {
					ViewIndex.responseCommand({color:'color-server-error',msg:msg.msg})
				}
				
			} else {
				ViewIndex.responseCommand({color:'color-server-error',msg:'Critical error bad session.id'})
			}
		};

		function on_get_nick(msg){
			if (ModelConn.session.id == msg.id){
				ViewIndex.responseCommand({color:'color-server-info',msg:msg.nick})
			} else {
				ViewIndex.responseCommand({color:'color-server-error',msg:'Critical error bad session.id'})
			}
		};

		function on_create_room(msg){	
			ViewIndex.responseCommand({color:'color-server-info',msg:msg.msg})
		};

		function on_join_room(msg){	
			ModelConn.session.room = msg.room	
			$('.prompt').html(ModelConn.session.nick+'@'+ModelConn.session.room+'>&nbsp;');
			ViewIndex.responseCommand({color:'color-server-info',msg:msg.msg})
		};

		function on_leave_room(msg){	
			ModelConn.session.room = 'main'	
			$('.prompt').html(ModelConn.session.nick+'@'+ModelConn.session.room+'>&nbsp;');
			ViewIndex.responseCommand({color:'color-server-info',msg:msg.msg})
		};

		function on_talk(msg){
			ViewIndex.responseCommand({color:'color-server-chat',msg:msg.sender+' said: '+msg.msg})
		};

		function on_list_rooms(msg){
			if (msg.list_rooms != null){
				for (var i = 0; i < msg.list_rooms.length; i++) {
					ViewIndex.responseCommand({color:'success',msg:'Room name: '+msg.list_rooms[i].room_name+', room description: '+msg.list_rooms[i].desc+', room is public: '+msg.list_rooms[i].isPublic})
				};
			} else {
				ViewIndex.responseCommand({color:'success',msg:msg.msg})	
			}
		};

		init();

		return {
			"init" : init,
			"on_connect" : on_connect,
			"on_error" : on_error,
			"on_warning" : on_warning,
			"on_set_nick" : on_set_nick,
			"on_get_nick" : on_get_nick,
			"on_shout" : on_shout,
			"on_create_room" : on_create_room,
			"on_join_room" : on_join_room,
			"on_leave_room" : on_leave_room,
			"on_talk" : on_talk,
			"on_list_rooms" : on_list_rooms
		};
	}());
	return module;
});