define(['jquery','underscore'],function($,_){

	var module = (function(){
		
		self = Object;

		function init(){
			console.log('view.index init');
			require(['text!tpl_index','model.connection'],function(TplIndex,ModelConn){
				var nick = ModelConn.session.nick;
				var room = ModelConn.session.room;
				self.tplIndex = _.template(TplIndex)
				self.parent = $('#main-container');
				self.parent.html(self.tplIndex({nick:nick,channel:room}));
				bindUI();		
			});	
			
		};

		function bindUI(){
			console.log('view.index bindUI');
			setupTerminal();

		};

		function scrollToBottom(){
			window.scrollTo(0,document.body.scrollHeight);
		};

		function setupTerminal(){
			$('.cmd-input textarea').focus();

			$('.cmd-input').click(function(){
				$('.cmd-input textarea').focus()
			});

			$('.cmd-input textarea').keyup(function(){
				$('.cmd-input .cursor').text($(this).val())
			});

			$('.cmd-input textarea').keydown(function(){
				$('.cmd-input .cursor').text($(this).val())
			});

			$('.cmd-input textarea').keypress(function(e){
				if (e.keyCode === 13){
					submitCommand();
				}
			});
			$('#main-container').click(function(){
				$('.cmd-input textarea').focus()
			});			
		};

		function submitCommand(){
			var command = $('.cmd-input .cursor').text().trim(); 
			require(['text!tpl_index','model.connection'],function(TplIndex,ModelConn){
				var nick = ModelConn.session.nick;
				var room = ModelConn.session.room;
				if (room == null){
					room = 'main';
				}
				$('.cmd-output').append('<div>'+nick+'@'+room+'>&nbsp;'+$('.cmd-input .cursor').text().trim()+'</div>');
				$('.cmd-input .cursor').text('');
				$('.cmd-input textarea').val('').focus();
			});
			scrollToBottom();
			require(['ctrl.parseCMD'],function(CtrlParseCMD){
				CtrlParseCMD.parseCommand(command);
			});
		};

		function responseCommand(response){
			$('.cmd-output').append('<div><span class="'+response.color+'">'+response.msg+'</span></div>');
			scrollToBottom();
		};

		init();

		return {
			"init" : init,
			"responseCommand" : responseCommand,
		};

	}());

	return module;
});