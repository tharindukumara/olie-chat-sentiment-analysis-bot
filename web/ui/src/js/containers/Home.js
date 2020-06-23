import React from 'react';

import { Box} from 'grommet';
import Header from '../components/Header'
import Section from '../components/Section';
import ChatBox from '../components/ChatBox';
import Controllers from '../components/Media';

class Home extends React.Component {
    render() {
        return (
            <Box>
                <Section>
                    <Box direction="row-responsive" justify="start" gap="xlarge">
                        <Box width="xlarge" justify="center">
                            <Header
                                label="Olie - Sentiment Bot"
                                size="medium"
                                summary="An open-source AI based real-time chatbot  
                                            that identifies the sentiments in your conversations."
                            />
                            <Controllers />
                        </Box>
                        <Box width="xlarge"  elevation="medium" align="center">
                            <Box background="light-2" >
                                <ChatBox />
                            </Box>
                        </Box>
                    </Box>
                </Section>
            </Box>
        )
    }
}

export default Home;