# -*- coding: utf-8 -*-

"""
SocketIO app for learnig purpose
"""

from flask import Flask 
from flask.ext.socketio import SocketIO

from app.libs.handler_connections import Connections
from app.libs.handler_rooms import Rooms

#main app object
app = Flask(__name__)
#load config
app.config.from_object('app.environment.config.Dev')

#socketio object
socketio = SocketIO(app)

#connections data
conn_data = Connections()

#rooms data

rooms = Rooms()

import views.socket_io
import views.main