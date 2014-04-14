# -*- coding: utf-8 -*-

"""
Handler for chat rooms 
"""

from hashlib import sha512

import random
import string

SIMPLE_CHARS = string.ascii_letters + string.digits

class HashGenerator(object):
	"""
	Generator for random hashes and strings
	"""
	def __init__(self):
		pass

	def get_random_string(self,length=24):
	    """
	    Generate random string
	    @length - string length
	    """
	    return ''.join(random.choice(SIMPLE_CHARS) for i in xrange(length))

	def get_random_hash(self,length=24):
	    """
	    Generate hash from random string
	    @length - string length
	    """
	    hash_data = sha512()
	    hash_data.update(self.get_random_string(length))
	    return hash_data.hexdigest()[:length]

class Rooms(object):
	"""
	Class for rooms manipulation
	"""
	def __init__(self):
		self.dict = {}
		self.hg = HashGenerator()

	def _set_dict(self,key,value):
		"""
		Set value of key
		"""
		try:
			self.dict[key] = value
			return True,{'status':'success'}
		except Exception, e:
			return False, {'status':'error','typ':'_set_dict','msg':str(e)}
		

	def _get_dict(self,key):
		"""
		Get value of key
		"""
		if key in self.dict.keys():
			return True, self.dict[key]
		else:
			return False,None

	def create_room(self,desc,passwd=None):
		"""
		Create new chat room
		"""
		room_name = self.hg.get_random_hash(8)
		if not room_name in self.dict.keys():
			status, response = self._set_dict(room_name,{'users':[],'desc':desc,'passwd':passwd})
			if status:
				return True,{'status':'success','room':room_name,'msg':'Created room name: '+room_name}
			else:
				return status,response
		else:
			return False, {'status':'warning','msg':'room already exist'}

	def join_room(self,id_conn,room,passwd=None):
		"""
		Join chat room
		@id_conn - id_conn of client that is joing the room
		@room - room name that client joing
		@passwd - password for enter to private room
		"""
		if room in self.dict.keys():
			room_passwd = self.dict[room]['passwd']
			
			if room_passwd == passwd:
				#password correct
				status, data = self._get_dict(room)
				data['users'].append(id_conn) 
				status, response = self._set_dict(room,data)
				if status:
					return self._get_dict(room)
				else:
					return status,response
			else:
				return False,{'status':'error','typ':'password','msg':'Wrong password'}

		else:
			return False,{'status':'warning','msg':'This room not exist'}

	def leave_room(self,id_conn,room):
		"""
		Leave chat room
		@id_conn - id_conn of client that is leaving the room
		@room - room name that client leaving
		"""
		if room in self.dict.keys():
			status, data = self._get_dict(room)
			data['users'].remove(id_conn)
			status, response = self._set_dict(room,data)
			if status:
				return self._get_dict(room)
			else:
				return status,response
		else:
			return False,{'status':'warning','msg':'This room not exist'}

	def count_rooms(self):
		"""
		Count rooms and return value
		"""	
		return len(self.dict)

	def list_rooms(self):
		"""
		Return list of rooms in a specified range
		"""
		l_rooms = []
		for room in self.dict.keys():
			output = {}
			output['room_name'] = room
			output['desc'] = self.dict[room]['desc']
			if self.dict[room]['passwd'] is not None:
				output['isPublic'] = False
			else:
				output['isPublic'] = True
			l_rooms.append(output)
		return l_rooms
