# -*- coding: utf-8 -*-

"""
Main view 
"""

from app import app
from flask import render_template

@app.route('/',methods=['GET'])
def home():
	return render_template('index.html')

