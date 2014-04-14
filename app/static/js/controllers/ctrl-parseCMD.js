define(['jquery','model.connection','view.index'],function($,ModelConn,ViewIndex){
	var module = (function(){
		
		function init (){
			console.log('ctrl.parseCMD init');
		};

		function parseCommand(command){
			if (command.length > 0){
				var cmd = command.split(" ",1)[0];
				args = command.substr(cmd.length,command.length).trim();
				execCmd(cmd,args);
			} else {
				make_reponse('danger','You must enter text');	
			};
		};

		function execCmd(cmd,args){
			switch (cmd) {
				case 'help':
					if (args == "") {
						console.log('Help for TermTalk app');					
					} else {
						switch (args) {
							case 'nick':
								console.log('Help about "nick"');
								break;
							case 'create_room':
								console.log('Help about "create_room"');
								break;
						}
					}
					break;

				case 'nick':
					if (args == ""){
						get_nick()
					}else{
						set_nick(args)
					}
					break;

				case 'create_room':
					if (args == ""){
						make_reponse('danger','You must specify options see help');						
					} else {
						kwargs = args.split(" ");
						switch (kwargs[0]){
							case '-d':
								if (kwargs.indexOf('-p') > 0){
									var desc = kwargs.slice(kwargs.indexOf('-d')+1,kwargs.indexOf('-p'));
								} else {
									var desc = kwargs.slice(kwargs.indexOf('-d')+1,kwargs.length);
								}
								desc = desc.join(' ').trim();
								if (desc != ''){
									if (kwargs.indexOf('-p') > 0){
										var passwd = kwargs[kwargs.indexOf('-p')+1]
									} else {
										var passwd = null
									}
									
									create_room(desc,passwd);

								} else {
									make_reponse('danger','After [-d] option you must enter description of channel');										
								}
								break;

							case '-p':
								if (kwargs.indexOf('-d') > 0){
									if (kwargs.indexOf('-d') == 1) {
										make_reponse('danger','After [-p] option you must enter password for channel protection')
									} else {
										if (kwargs[1] != "") {
											var passwd = kwargs[1];
											var desc = kwargs.slice(kwargs.indexOf('-d')+1,kwargs.length);
											desc = desc.join(' ').trim();
											if (desc != ''){

												create_room(desc,passwd);

											} else {
												make_reponse('danger','After [-d] option you must enter description of channel');										
											}
										} else {
											make_reponse('danger','After [-p] option you must enter password for channel protection')
										}
									}
								} else {
									make_reponse('danger','You must spcify all required options see help')
								}
								break;

							default:
								make_reponse('danger','Wrong options see help');								
						}
					}
					break;

				case 'list_rooms':
					if (args == ""){
						make_reponse('danger','You must specify required options see help')
					} else {
						kwargs = args.split(" ");
						switch (kwargs[0]){
							//range
							case '-l':
								var range = kwargs.slice(kwargs.indexOf('-l')+1,kwargs.length)
								list_rooms('list');
								break;
							
							//count
							case '-c':
								list_rooms('count');
								break;
							
							default:
								make_reponse('danger','Wrong option/s see help')
						}
					}
					break;

				case 'join_room':
					if (args == ""){
						make_reponse('danger','You must specify required options see help')
					} else {
						kwargs = args.split(" ");
						if (kwargs.indexOf('-n') != -1){
							var room_name = kwargs[kwargs.indexOf('-n')+1];
							if (kwargs.indexOf('-p') != -1){
								var room_passwd = kwargs[kwargs.indexOf('-p')+1];
							} else {
								var room_passwd = null;
							}
							join_room(room_name,room_passwd);
						} else {
							make_reponse('danger','You must spcify all required options see help')
						}
					}
					break;

				case 'leave_room':
					if (ModelConn.session.room !='main'){
						leave_room();
					} else {
						make_reponse('warning','You can not leave main room')
					}
					break;

				case 'shout':
					if (args == ""){
						make_reponse('danger','You must specify required options see help')
					} else {
						shout(args)
					}
					break;

				default:
					if (ModelConn.session.room == 'main'){
						make_reponse('danger','I dont know this command');
					} else {
						talk(cmd+' '+args);
					}
									
			}
		};
		
		function make_reponse(color,msg){
			var result = {}
			result.color = color;
			result.msg = msg;
			ViewIndex.responseCommand(result);
		};

		function set_nick(nick){
			ModelConn.set_nick(nick);
		};

		function get_nick(){
			ModelConn.get_nick();	
		};

		function create_room(desc,passwd){
			ModelConn.create_room(desc,passwd);		
		};

		function list_rooms(option){
			ModelConn.list_rooms(option);	
		};

		function join_room(name,passwd){
			ModelConn.join_room(name,passwd);	
		};

		function leave_room(){
			ModelConn.leave_room();			
		};

		function shout(msg){
			ModelConn.shout(msg);
		};

		function talk(msg) {
			ModelConn.talk(msg);				
		};

		init()
		
		return {
			"parseCommand" : parseCommand,
		};

	}());

	return module;
});