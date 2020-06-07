from flask_restplus import Namespace, fields


class SentimentDto:
    api = Namespace('sentiment', description='sentiment prediction')
    sentiment = api.model('sentiment', {
        'sentence': fields.String(required=True, description='sentence to predict'),
    })
