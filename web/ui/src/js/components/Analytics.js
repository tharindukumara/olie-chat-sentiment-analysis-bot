import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';

const config = {
    trackerId: 'UA-169914402-1',
    debug: false,
};

const Analytics = ({ children }) => {
    const { path } = React.useContext( React.createContext({}));
    const [initialized, setInitialized] = React.useState();

    React.useEffect(() => {
        if (!initialized) {
            const { trackerId, ...rest } = config;
            ReactGA.initialize(trackerId, { ...rest });
            setInitialized(true);
        }
        if (path) {
            ReactGA.set({ page: path });
            ReactGA.pageview(path);
        }
    }, [initialized, path]);

    return children;
};

Analytics.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Analytics;
