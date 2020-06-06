import jedi.plugins.flask
from flask import request

from ..util.dto import PredictDto
from ..service.sentiment_service import predict


_predict = PredictDto.predict

@api.route('/predict')
class SentimentPrediction(Resource):
    @api.expect(_predict, validate=True)
    @api.response(200, 'Predict sentiment of the sentence.')
    @api.doc('predict sentiment of a sentence')
    def post(self):
        """Predict sentiment """
        data = request.json
        return predict(data)
