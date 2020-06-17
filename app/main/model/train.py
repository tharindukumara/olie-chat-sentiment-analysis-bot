import pandas as pd
import torch.nn as nn
import numpy as np
import torch

import app.main.model.config as config
import app.main.model.params as params
import app.main.model.dataset as dataset
import app.main.model.engine as engine
import app.main.model.utils as utils

from app.main.model import BERTBaseUncased
from sklearn import model_selection
from sklearn import metrics
from transformers import AdamW
from transformers import get_linear_schedule_with_warmup


def preprocess_data(dfx):
    df_train, df_valid = model_selection.train_test_split(dfx, test_size=0.1, random_state=42, stratify=dfx.sentiment.values)

    df_t = df_train.reset_index(drop=True)
    df_v = df_valid.reset_index(drop=True)

    return df_t, df_v



def prepare_data():
    dfx = pd.read_csv(config.TRAINING_FILE).fillna("none")
    dfx.sentiment = dfx.sentiment.apply(lambda x: 1 if x == "positive" else 0)

    df_train, df_valid = preprocess_data(df_train, df_valid)

    train_dataset = dataset.BERTDataset(review=df_train.review.values, target=df_train.sentiment.values)
    train_data_loader = torch.utils.data.DataLoader(train_dataset, batch_size=config.TRAIN_BATCH_SIZE, num_workers=4)

    valid_dataset = dataset.BERTDataset(review=df_valid.review.values, target=df_valid.sentiment.values)
    valid_data_loader = torch.utils.data.DataLoader(valid_dataset, batch_size=config.VALID_BATCH_SIZE, num_workers=1)

    return train_data_loader, valid_data_loader, df_train, df_valid



def run():
    train_data_loader, valid_data_loader, df_train, df_valid = prepare_data()

    device = torch.device(config.PLATFORM)
    model = BERTBaseUncased()
    model.to(device)

    num_train_steps = int(len(df_train) / config.TRAIN_BATCH_SIZE * config.EPOCHS)

    param_optimizer = list(model.named_parameters())
    optimizer = AdamW(params.optimizer_parameters, lr=3e-5)
    scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=num_train_steps)

    model = nn.DataParallel(model)
    best_accuracy = 0
    es = utils.EarlyStopping(patience=5, mode="max")

    for epoch in range(config.EPOCHS):
        engine.train_fn(train_data_loader, model, optimizer, device, scheduler)
        outputs, targets = engine.eval_fn(valid_data_loader, model, device)
        outputs = np.array(outputs) >= 0.5
        accuracy = metrics.accuracy_score(targets, outputs)
        print("Accuracy Score = {}".format(accuracy))

        if config.EARLY_STOPPING:
            es(accuracy, model, model_path=config.MODEL_PATH)
            if es.early_stop:
                print("**********************************************")
                print("Early stopping")
                print("**********************************************")
                break
        else:
            if accuracy > best_accuracy:
                print("**********************************************")
                print("Validation score improved ({} --> {}). Saving model!!!".format(accuracy, best_accuracy))
                print("**********************************************")
                torch.save(model.state_dict(), config.MODEL_PATH)
                best_accuracy = accuracy


if __name__ == "__main__":
    print("Train Started")
    run()