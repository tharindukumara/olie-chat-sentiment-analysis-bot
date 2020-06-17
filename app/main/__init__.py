import logging
from datetime import datetime as dt

from flask import Flask, request
from .config import config_by_name
from .app import run
from .extensions import logs, request_interceptors


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    register_extensions(app)
    run()

    return app




def register_extensions(app):
    logs.init_app(app)
    request_interceptors.init_app(app)
    return None

