import torch
from transformers import AutoModel, AutoTokenizer

MODEL_PATH = "app/data/model/model.bin"
TRAINING_FILE = "app/data/imdb.csv"

MAX_LEN = 512
TRAIN_BATCH_SIZE = 4
VALID_BATCH_SIZE = 2
EPOCHS = 10
MODEL_NAME = "bert-base-uncased"

MODEL = AutoModel.from_pretrained(MODEL_NAME)
TOKENIZER = AutoTokenizer.from_pretrained(MODEL_NAME)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
EARLY_STOPPING = False