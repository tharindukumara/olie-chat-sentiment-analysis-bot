import React from 'react';
import { Box, Button } from 'grommet';


const UserOptions = (props) => {
    return (
        <Box gap="xsmall" direction="row-responsive" margin={{ vertical: "xsmall" }}>
            <Button hoverIndicator="light-2" size="small" label="Yes" onClick={() => { props.onClickYes() }} />
            <Button hoverIndicator="light-2" size="small" label="No" onClick={() => { props.onClickNo() }} />
        </Box>
    );
}

export default UserOptions;
