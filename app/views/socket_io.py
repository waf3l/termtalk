# -*- coding: utf-8 -*-

"""
Socket IO methods and events
"""

from app import app, socketio, conn_data, rooms
from app.environment.hash_generator import get_random_hash
from flask.ext.socketio import emit, join_room, leave_room
from flask import request,session

@socketio.on('connect', namespace='/main')
def socket_connect():
	try:
		id_conn = get_random_hash(8)
		request.namespace.session['id_conn'] = id_conn
		status,response = conn_data.save_conn(id_conn,{'nick':'Guest_'+id_conn})
		if status:
			emit('on_connect',{'id':id_conn,'nick':'Guest_'+id_conn,'msg':'You are now connected'})
		else:
			emit('error',{'typ':'connect','msg':response})
	except Exception, e:
		emit('error',{'typ':'connect','msg':str(e)})


@socketio.on('disconnect', namespace='/main')
def socket_disconnect():
	status, response = conn_data.del_conn(request.namespace.session['id_conn'])
	if not status:
		print response

@socketio.on('set_nick', namespace='/main')
def socket_set_nick(id_conn,nick):
	status,response = conn_data.set_nick(id_conn, nick)
	if status:
		emit('set_nick',{'id':id_conn,'nick':nick,'msg':response})
	else:
		emit('set_nick',{'id':id_conn,'nick':None,'msg':response})

@socketio.on('get_nick', namespace='/main')
def socket_get_nick(id_conn):
	status, response = conn_data.get_nick(id_conn)
	if status:
		emit('get_nick',{'id':id_conn,'nick':response})
	else:
		emit('error',{'typ':'get_nick','msg':'This connection not exist in connetions object'})

@socketio.on('shout', namespace='/main')
def socket_shout(msg):
	status, nick = conn_data.get_nick(request.namespace.session['id_conn'])
	if status:
		emit('shout',{'msg':nick+' said: '+msg},namespace='/main',broadcast=True)

@socketio.on('create_room', namespace='/main')
def socket_create_room(desc,passwd=None):
	status,response = rooms.create_room(desc,passwd)
	if status:
		emit('create_room',{'room':response['room'],'msg':response['msg']})
	else:
		if response['status'] == 'warning':
			emit('warning',{'msg':response['msg']})
		else:
			emit('error',{'typ':'create_room','msg':response['msg']})

@socketio.on('join_room', namespace='/main')
def socket_join_room(room,passwd=None):
	status,response = rooms.join_room(request.namespace.session['id_conn'],room,passwd)
	if status:
		join_room(room)
		room_users=[]
		for user in response['users']:
			status,nick = conn_data.get_nick(user)
			room_users.append(nick)
		my_status, my_nick = conn_data.get_nick(request.namespace.session['id_conn'])
		emit('join_room',{'msg':'User: '+my_nick+' join room: '+room,'users':room_users,'room':room},room=room)
	else:
		if response is not None:
			if response['status'] == 'warning':
				emit('warning',{'msg':response['msg']})
			else:
				emit('error',{'typ':'join_room','msg':response['msg']})
		else:
			emit('error',{'typ':'join_room','msg':response['msg']})

@socketio.on('leave_room', namespace='/main')
def socket_leave_room(room):
	status,response = rooms.leave_room(request.namespace.session['id_conn'],room)	
	if status:
		leave_room(room)
		room_users=[]
		for user in response['users']:
			status,nick = conn_data.get_nick(user)
			room_users.append(nick)
		my_status, my_nick = conn_data.get_nick(request.namespace.session['id_conn'])
		emit('leave_room',{'msg':'User: '+my_nick+' leave room: '+room,'users':room_users,'room':room},room=room)
	else:
		if response is not None:
			if response['status'] == 'warning':
				emit('warning',{'msg':response['msg']})
			else:
				emit('error',{'typ':'leave_room','msg':'Something bad happen with leave_room, strange response'})
		else:
			emit('error',{'typ':'join_room','msg':'Something bad happen with leave_room, empty response'})		

@socketio.on('talk', namespace='/main')
def socket_talk(msg,room):
	status, sender = conn_data.get_nick(request.namespace.session['id_conn'])
	emit('talk',{'msg':msg,'sender':sender},room=room)

@socketio.on('list_rooms', namespace='/main')
def socket_list_rooms(option):

	if option == 'count':
		emit('list_rooms',{'msg':'Number of rooms: '+str(rooms.count_rooms()),'count':rooms.count_rooms()})
	elif option == 'list':
		emit('list_rooms',{'msg':'List of rooms','list_rooms':rooms.list_rooms()})