# -*- coding: utf-8 -*-

"""
Application configuration
"""
from hash_generator import get_random_hash

class Global():
	DEBUG=True
	TESTING=False
	SECRET_KEY=get_random_hash()

class Dev(Global):
	pass

class Production(Global):
	DEBUG=False