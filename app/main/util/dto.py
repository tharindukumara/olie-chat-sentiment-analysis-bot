from flask_restplus import Namespace, fields


class PredictDto:
    api = Namespace('predict', description='sentiment prediction')
    user = api.model('predict', {
        'sentence': fields.String(required=True, description='sentence to predict'),
    })
