from flask import request
from flask_restplus import Resource
from ..util.dto import SentimentDto
from ..service.sentiment_service import sentence_prediction

api = SentimentDto.api
_sentiment = SentimentDto.sentiment

@api.route('/predict')
class SentimentPrediction(Resource):
    @api.expect(_sentiment, validate=False)
    @api.response(200, 'Predict sentiment of the sentence.')
    @api.doc('predict sentiment of a sentence')
    def post(self):
        """Predict sentiment """
        data = request.json
        print(data)
        return sentence_prediction(data["sentence"])
