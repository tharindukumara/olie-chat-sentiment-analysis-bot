from flask import Flask

from .config import config_by_name
from .app import run

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])

    run()
    
    return app