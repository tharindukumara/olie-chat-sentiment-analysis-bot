import app
import torch
import time
import functools
import torch.nn as nn
import joblib
import flask

from flask import Flask
from ..model.model import BERTBaseUncased
from ..model.predict import predict
from ..app import PREDICTION_DICT

memory = joblib.Memory("app/data/cache", verbose=0)

def predict_from_cache(sentence):
    if sentence in PREDICTION_DICT:
        return PREDICTION_DICT[sentence]
    else:
        result = predict(sentence)
        PREDICTION_DICT[sentence] = result
        return result



def sentence_prediction(sentence):
    start_time = time.time()
    positive_prediction = predict(sentence)
    negative_prediction = 1 - positive_prediction
    
    response = {}
    response["response"] = {
        "positive": str(positive_prediction),
        "negative": str(negative_prediction),
        "sentence": str(sentence),
        "time_taken": str(time.time() - start_time),
    }
    return flask.jsonify(response)

