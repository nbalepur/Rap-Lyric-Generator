from flask import Flask, request, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import torch
import torch.nn as nn
import torch.nn.functional as Functional
from torch import jit
import random
from better_profanity import profanity as Profanity
import json
import numpy as np

idx_to_word = json.load( open( "data/idx_to_word.json" ) )
word_to_idx = json.load( open( "data/word_to_idx.json" ) )

num_hidden = 256
num_layers = 4
embed_size = 200
drop_prob = 0.3
lr = 0.001
num_epochs = 20
batch_size = 32

class LyricLSTM(nn.Module):
    
    ''' Initialize the network variables '''
    def __init__(self, num_hidden, num_layers, embed_size, drop_prob, lr):

        # call super() on the class
        super().__init__()

        # declare the vocab size
        vocab_size = 6141
        
        # store the constructor variables
        self.drop_prob = drop_prob
        self.num_layers = num_layers
        self.num_hidden = num_hidden
        self.lr = lr
        
        # define the embedded layer
        self.embedded = nn.Embedding(vocab_size, embed_size)

        # define the LSTM
        self.lstm = nn.LSTM(embed_size, num_hidden, num_layers, dropout = drop_prob, batch_first = True)
        
        # define a dropout layer
        self.dropout = nn.Dropout(drop_prob)
        
        # define the fully-connected layer
        self.fc = nn.Linear(num_hidden, vocab_size)      
    
    ''' Forward propogate through the network '''
    def forward(self, x, hidden):
        
        ## pass input through embedding layer
        embedded = self.embedded(x)     
        
        # Obtain the outputs and hidden layer from the LSTM layer
        lstm_output, hidden = self.lstm(embedded, hidden)
        
        # pass through a dropout layer and reshape
        dropout_out = self.dropout(lstm_output).reshape(-1, self.num_hidden) 

        ## put "out" through the fully-connected layer
        out = self.fc(dropout_out)

        # return the final output and the hidden state
        return out, hidden
    
    ''' Initialize the hidden state of the network '''
    def init_hidden(self, batch_size):
        
        # Create a weight torch using the parameters of the model
        weight = next(self.parameters()).data

        # initialize the hidden layer using the weight torch
        hidden = (weight.new(self.num_layers, batch_size, self.num_hidden).zero_(),
                  weight.new(self.num_layers, batch_size, self.num_hidden).zero_())
        
        # return the hidden layer
        return hidden

# load the model
model = LyricLSTM(num_hidden, num_layers, embed_size, drop_prob, lr)
model.load_state_dict(torch.load("data/models/model1.pt"))

# load the swear words to censor
Profanity.load_censor_words()

def get_lyric(start_text, censor, num_words, use_random):

    global model

    # generate the text
    generated_text = generate(model, num_words, start_text.lower(), use_random).title()

    # censors the word if necessary
    return Profanity.censor(generated_text) if censor else generated_text

def generate(model, num_words, start_text, use_random):
    
    # baseline model eval
    model.eval()
    
    # create the initial hidden layer of batch size 1
    hidden = model.init_hidden(1)
    
    # convert the starting text into tokens
    tokens = start_text.split()
    
    # iterate through and predict the next token
    for token in start_text.split():
        curr_token, hidden = predict(model, token, hidden, use_random)
    
    # add the token
    tokens.append(curr_token)
    
    # predict the subsequent tokens
    for token_num in range(num_words - 1):
        token, hidden = predict(model, tokens[-1], hidden, use_random)
        tokens.append(token)
        
    # return the formatted string
    return " ".join(tokens)

def predict(model, tkn, hidden_layer, use_random):

    global word_to_idx
    global idx_to_word

    # create torch inputs
    x = np.array([[word_to_idx[tkn]]])
    inputs = torch.from_numpy(x).type(torch.LongTensor)

    # detach hidden state from history
    hidden = tuple([layer.data for layer in hidden_layer])

    # get the output of the model
    out, hidden = model(inputs, hidden)

    # get the token probabilities and reshape
    prob = Functional.softmax(out, dim = 1).data.numpy()
    prob = prob.reshape(prob.shape[1],)

    # get indices of top 3 values
    top_tokens = prob.argsort()[-3:][::-1]
    
    # randomly select one of the three indices
    selected_index = top_tokens[random.sample([0,1,2], 1)[0] if use_random else 0]

    # return word and the hidden state
    return idx_to_word[str(selected_index)], hidden

@app.route("/generate", methods = ["POST"])
def generate_lyric():

    start_text = request.json["start_text"]
    censor = request.json["censor"]
    num_words = request.json["num_words"]
    use_random = request.json["use_random"]

    return get_lyric(start_text, censor, num_words, use_random)