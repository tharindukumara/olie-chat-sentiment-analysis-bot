import logging
from datetime import datetime as dt

from flask import Flask, request, current_app

"""
We have options in python for stdout (streamhandling) and file logging
File logging has options for a Rotating file based on size or time (daily)
or a watched file, which supports logrotate style rotation
Most of the changes happen in the handlers, lets define a few standards
"""


class RequestInterceptor(object):
    def __init__(self, app=None, **kwargs):
        if app is not None:
            self.init_app(app, **kwargs)

    def init_app(self, app):
        @app.before_request
        def begire_request():
            print('request recieved')


        @app.after_request
        def after_request(response):
            """ Logging after every request. """
            # print(response.data)
            logger = current_app.logger
                # logger.info(
                #     "[%s] %s %s %s %s %s %s %s %s",
                #     dt.utcnow().strftime("%d/%b/%Y:%H:%M:%S.%f")[:-3],
                #     request.method,
                #     request.path,
                #     request.scheme,
                #     response.status,
                #     response.content_length,
                #     request.referrer,
                #     request.user_agent,
                #     response.data
                # )
            return response