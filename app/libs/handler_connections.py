# -*- coding: utf-8 -*-

"""
Handler for client connections 
"""

class Connections(object):
	"""
	Class for connections manipultaion
	"""
	def __init__(self):
		#connetions dict 
		self.dict = {}

	def _set_dict(self,key,value):
		"""
		Set value of key
		"""
		try:
			self.dict[key] = value
			return True,None
		except Exception, e:
			return False, str(e)
		

	def _get_dict(self,key):
		"""
		Get value of key
		"""
		if key in self.dict.keys():
			return True, self.dict[key]
		else:
			return False,None

	def save_conn(self,id_conn,data):
		"""
		Save initial connection state
		"""
		return self._set_dict(id_conn,data)

	def del_conn(self,key):
		"""
		Delete connection data after disconnect
		"""
		if key in self.dict.keys():
			self.dict.pop(key,None)
			return True,None
		else:
			return False,'Key not exist in connections data'

	def set_nick(self,id_conn,nick):
		"""
		Set new nick name, check if nick name is already in use
		"""
		for key in self.dict.keys():
			if self.dict[key]['nick'] == nick:
				return False,'Nick name already in use '
		
		self.dict[id_conn]['nick'] = nick
		return True, 'You nick is now: '+nick

	def get_nick(self,id_conn):
		"""
		Get nick name for specified connection
		"""
		status, response = self._get_dict(id_conn)
		if status:
			return True, response['nick']
		else:
			return False, None