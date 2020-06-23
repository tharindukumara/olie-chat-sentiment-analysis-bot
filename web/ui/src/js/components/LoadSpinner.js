import React from 'react';
import { Box } from 'grommet';


const LoaderSpinner = (props) => {
  return (
    <Box>
      <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="20" cy="65.5" r="12" fill="#74007a">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="65.5;34.5;65.5;65.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
        </circle> <circle cx="55" cy="65.5" r="12" fill="#a53faa">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="65.5;34.5;65.5;65.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate>
        </circle> <circle cx="90" cy="65.5" r="12" fill="#da70dc">
          <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="65.5;34.5;65.5;65.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate>
        </circle>
      </svg>
    </Box>
  );
}

export default LoaderSpinner;
