# -*- coding: utf-8 -*-

"""
Hash generator for application purpose
"""

from hashlib import sha512

import random
import string

SIMPLE_CHARS = string.ascii_letters + string.digits

def get_random_string(length=24):
    return ''.join(random.choice(SIMPLE_CHARS) for i in xrange(length))

def get_random_hash(length=24):
    hash_data = sha512()
    hash_data.update(get_random_string(length))
    return hash_data.hexdigest()[:length]