import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Markdown, Paragraph } from 'grommet';

const Header = ({ align = 'center', details, label, level, size, summary }) => {
  const textAlign = align === 'center' ? align : undefined;
  return (
    <Box align={align}>
      <Heading level={level} size={size} textAlign={textAlign} margin="none">
        {label}
      </Heading>
      {summary &&
        ((typeof summary === 'string' && (
          <Paragraph size="xlarge" textAlign={textAlign} margin={{vertical:'large'}}>
            {summary}
          </Paragraph>
        )) ||
          summary)}
      {details && (
        <Markdown components={{ p: () => <Paragraph textAlign={textAlign} /> }}>
          {details
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .trim()}
        </Markdown>
      )}
    </Box>
  );
};

Header.propTypes = {
  align: PropTypes.string,
  details: PropTypes.string,
  label: PropTypes.string.isRequired,
  level: PropTypes.number,
  size: PropTypes.oneOf(['large', 'medium']),
  summary: PropTypes.node,
};

Header.defaultProps = {
  align: undefined,
  details: undefined,
  level: 1,
  size: 'large',
  summary: undefined,
};

export default Header;
