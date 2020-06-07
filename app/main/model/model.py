from .config import MODEL
import transformers
import torch.nn as nn


class BERTBaseUncased(nn.Module):
    def __init__(self):
        super(BERTBaseUncased, self).__init__()
        self.bert = MODEL
        self.bert_drop = nn.Dropout(0.3)
        self.out = nn.Linear(768, 1)


    def forward(self, ids, mask, token_type_ids):
        print(ids)
        _, o2 = self.bert(ids, attention_mask=mask, token_type_ids=token_type_ids)
        bo = self.bert_drop(o2)
        output = self.out(bo)
        return output