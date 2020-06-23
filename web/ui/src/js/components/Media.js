import React from 'react';

import { Anchor, Box, Text } from 'grommet';
import { Github } from 'grommet-icons';


export default () => (
    <Box
        direction="row"
        gap="large"
        justify="center"
        margin={{ vertical: 'medium' }}
    >
        <Anchor
            target="_blank"
            a11yTitle="Share feedback on Github"
            href="https://github.com/tharindukumara/"
            icon={<Github color="brand" size="large" />}
            label={<Text size="large"></Text>}
        />
    </Box>
);