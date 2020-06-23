import React from 'react'
import Home from './containers/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

class App extends React.Component {
  render() {
    return (
      <div>
        
          <Router>
            <Switch>
            <Grommet theme='grommet'>
              <Route path="/" exact component={Home} />
              <Route path="/:url" component={Home} />
              </Grommet>
            </Switch>
          </Router>
       
        
      </div>
    )
  }
}

export default App;