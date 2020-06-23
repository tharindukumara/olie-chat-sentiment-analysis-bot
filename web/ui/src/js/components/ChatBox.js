import React from 'react';

import { Box, Text } from 'grommet';
import ChatBoxHeader from './ChatBoxHeader';
import ChatMessageList from './ChatMessageList';
import ChatMessageForm from './ChatMessageForm';
import LoaderSpinner from './LoadSpinner';
import { getFeedbackFromScores } from '../lib/ChatAPI'
import BarChat from './BarChart';
import { createChatMessage } from './ChatMessage';
import UserOptions from './UserOptions';

var CONFIG = {
  GUTTER: "chatbot.png",
  SERVER_IP_ADDR: "http://127.0.0.1:5000"
}

var APIS = {
  SENTIMENT_PREDICT: "/sentiment/predict"
}


class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatItems: 0,
      loading: false,
      messages: []
    }

    this.positiveValue = 0
    this.negativeValue = 0

    this.loadInitialMessages();
  }

  updateState = (states) => {
    this.setState({ messages: [...this.state.messages, ...states] });
  }


  loadInitialMessages = async () => {
    createChatMessage({ content: "Hello", avatar: CONFIG.GUTTER, attached: false })
      .then(data => {
        this.updateState([data])
      })

    await createChatMessage({ content: "I am Olie.", delay: true })
      .then(data => {
        this.updateState([data])
      });

    await createChatMessage({ content: "I can detect sentiments in your messages.", delay: true })
      .then((data) => {
        this.updateState([data])
      });
  }


  onClickNo = async () => {
    this.state.messages.pop();

    await createChatMessage({ content: "No", loader: false, mine: true, attached: false, contentPosition: "end" })
      .then((data) => {
        this.updateState([data])
      });

    await createChatMessage({ content: "Ok. Wanna try again? Type a message again.", avatar: CONFIG.GUTTER, attached: false, contentPosition: "start" })
      .then((data) => {
        this.updateState([data]);
      });
  }

  onClickYes = async () => {
    this.state.messages.pop()

    await createChatMessage({ content: "Yes", loader: false, mine: true, attached: false, contentPosition: "end" })
      .then((data) => {
        this.updateState([data])
      });

      console.log(this.positiveValue);
      console.log(this.negativeValue);
    var barChart = (<Box>
                      <BarChat positive={this.positiveValue * 1000} negative={this.negativeValue * 1000} />
                      <Text>Wanna try again?<br />Type a message again.</Text>
                    </Box>)
    await createChatMessage({ content: barChart, avatar: CONFIG.GUTTER, attached: false })
      .then((data) => {
        this.updateState([data])
      });

    this.postiveValue = 0
    this.negativeValue = 0
  }


  onPostResponse = async () => {
    var content = (<Box gap="small" direction="column">
      <Text>You want see the charts?</Text>
      <UserOptions onClickYes={this.onClickYes} onClickNo={this.onClickNo} />
    </Box>)
    await createChatMessage({ content: content })
      .then((data) => {
        this.updateState([data])
      });
  }


  onErrorResponse = async () => {
    console.log('error occurred');
    this.state.messages.pop()
    createChatMessage({  content: "Hmmm... Something is wrong." , avatar: CONFIG.GUTTER, attached: false })
      .then((data) => {
        this.updateState([data])
      });
  }


  onServerData = async (data) => {
    var positiveValue = parseFloat(data.response.positive)
    var negativeValue = parseFloat(data.response.negative)
    console.log(positiveValue)
    this.positiveValue = positiveValue;
    this.negativeValue = negativeValue;

    this.state.messages.pop()

    var feedbackContent = getFeedbackFromScores(positiveValue, negativeValue);
    await createChatMessage({ content: feedbackContent, avatar: CONFIG.GUTTER, attached: false })
      .then((data) => {
        this.updateState([data])
      });
  }


  onServerCall = async (data) => {
    console.log(CONFIG.SERVER_IP_ADDR + APIS.SENTIMENT_PREDICT)

    const sentPredRes = await fetch(CONFIG.SERVER_IP_ADDR + APIS.SENTIMENT_PREDICT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "sentence": data })
    }).then(res => {
        if (!res.ok) {
          Promise.reject(res);
          this.onErrorResponse();
        }
        return res;
      })
      .then(res => res.json());

    await this.onServerData(sentPredRes).then(() => {
      this.onPostResponse();
    });
  }


  onUserInput = async (msg) => {
    await createChatMessage({ content: msg, loader: false, mine: true, attached: false, contentPosition: "end" })
      .then((data) => {
        this.updateState([data])
      });


    await createChatMessage({ content: <LoaderSpinner />, attached: false })
      .then((data) => {
        this.updateState([data])
      });

    await this.onServerCall(msg);
  }


  render() {
    return (
      <Box>
        <Box
          key="fadeIn"
          animation={{ type: "fadeIn", duration: 2000 }}
          height="80vh"
          background="#F3F2F1"
          justify="center"
          width='large'
        >
          <ChatBoxHeader />
          <ChatMessageList messages={this.state.messages} />
          <ChatMessageForm onMessage={this.onUserInput} />
        </Box>
      </Box>
    )
  }
}

export default ChatBox;