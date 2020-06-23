import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import { Send } from 'grommet-icons';

class ChatMessageForm extends React.Component {
    constructor() {
        super()

        this.state = { message: '' };
    }

    onMessage = (e) => {
        e.preventDefault();

        console.log(this.state.message)
        if (this.state.message === '') return;
        this.props.onMessage(this.state.message);
        this.setState({ message: '' });
    }


    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onMessage(event)
        }
    }

    render() {
        return (
            <Box align="center" pad="xsmall" direction="row" background="#F3F2F1">
                <TextInput placeholder="Write a message!!!"
                    resize={false}
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value })} 
                    onKeyPress={this.handleKeyPress}
                    tabIndex="1"/>
                <Box pad="small" direction="row" align="center" gap="small">
                    <Button primary
                        plain={false}
                        icon={<Send />}
                        onClick={e => this.onMessage(e)} 
                        tabIndex="2"/>
                </Box>
            </Box>
        );
    }
}

export default ChatMessageForm;