import transformers
from transformers import AutoModel, AutoTokenizer

MODEL_PATH = "model.bin"
TRAINING_FILE = "../data/imdb.csv"


MAX_LEN = 512
TRAIN_BATCH_SIZE = 8
VALID_BATCH_SIZE = 4
EPOCHS = 10

TOKENIZER = MODEL_NAME = "bert-base-uncased"

# We need to create the model and tokenizer
model = AutoModel.from_pretrained(MODEL_NAME)
TOKENIZER = AutoTokenizer.from_pretrained(MODEL_NAME)