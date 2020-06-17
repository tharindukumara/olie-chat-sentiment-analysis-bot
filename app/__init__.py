from flask_restplus import Api
from flask import Blueprint

from .main.controller.sentiment_controller import api as sentiment_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint, title='BERT Sentiment Analysis', version='1.0'
            , description='BERT sentiment analysis web service' )

api.add_namespace(sentiment_ns, path='/sentiment')