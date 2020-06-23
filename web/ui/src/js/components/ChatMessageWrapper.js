import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import LoaderSpinner from './LoadSpinner';

class ChatMessageWrapper extends React.Component {
    constructor() {
        super()
        this.state = { isLoading: true }
    }

    componentDidMount() {
        if(this.props.loader) {
            setTimeout(() => {
                this.setState({isLoading: false})
            }, 800);
        }
        
    }

    render() {
        if (this.props.loader && this.state.isLoading) {
            return (<LoaderSpinner />);
        }

        return (
            <Box animation={{ type: "fadeIn", duration: 1000}}>
                {this.props.content}
            </Box>
        );
    }
}

export default ChatMessageWrapper;