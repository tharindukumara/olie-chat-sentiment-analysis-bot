import React from 'react';

import { Box } from 'grommet';
import { Chat, Provider, themes } from '@fluentui/react-northstar'

class ChatMessageList extends React.Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });

    setTimeout(function(){
      this.el.scrollIntoView({ behavior: 'smooth' });
    }.bind(this), 1000);
  }

  render() {
    return (
      <Box overflow={{ horizontal: "hidden", vertical: "auto" }} height={{ min: "60vh" }} background="#F3F2F1" >
        <Provider theme={themes.teams}>
          <Chat items={this.props.messages} />
        </Provider>
        <div ref={el => { this.el = React.findDOMNode(el); }} />
      </Box>
    );
  };

}

export default ChatMessageList;