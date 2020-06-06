import config
import torch
import functools
import torch.nn as nn
import joblib

from model import BERTBaseUncased

PREDICTION_DICT = dict()
MODEL = None

memory = joblib.Memory("../../data/cache", verbose=0)

def run():
    global MODEL

    MODEL = BERTBaseUncased()
    MODEL = nn.DataParallel(MODEL)
    MODEL.load_state_dict(torch.load(config.MODEL_PATH))
    MODEL.to(config.DEVICE)
    MODEL.eval()