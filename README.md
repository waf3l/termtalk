termtalk
========
Application for learnig flask with socketio.
To run app just install all dependencies, and run with comand
python run.py or if you want run with gunicorn type:
gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker run:app
