from .model import config
import torch
import functools
import torch.nn as nn
import joblib

from .model.model import BERTBaseUncased

PREDICTION_DICT = dict()
MODEL = None



def run():
    global MODEL

    MODEL = BERTBaseUncased()
    MODEL = nn.DataParallel(MODEL)
    MODEL.load_state_dict(torch.load(config.MODEL_PATH, map_location='cpu'))
    MODEL.to(config.DEVICE)
    MODEL.eval()