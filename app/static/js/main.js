require.config({
    baseUrl: "static/js/",
    paths: {
        //libs
        "jquery" : "libs/jquery-1.11.0.min",
        "jquery.bootstrap" : "libs/bootstrap.min",
        "underscore" : "libs/underscore-min",
        "text" : "libs/text",
        "socketio" : "libs/socket.io.min",
        
        //app
        "app" : "app",

        //models
        "model.connection" : "models/model-connection",

        //controllers
        "ctrl.parseCMD" : "controllers/ctrl-parseCMD",
        "ctrl.index" : "controllers/ctrl-index",

        //views
        "view.index" : "views/view-index",

        //events
        "event.socketio" : "events/event-socketio",
        
        //templates
        "tpl_index" : "templates/tpl-index.html",

    },
    shim:{
        "jquery.bootstrap":{
            deps:["jquery"]
        },
        "socketio": {
            exports: 'io'
        },
        "underscore": {
            exports: '_'
        },
    }
});

// Load the main app module to start the app

require(["app","jquery.bootstrap"], function (App) {
    // var app = App;
    // app.init()
    App;

});