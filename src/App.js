import React, { Component } from 'react'
import { Route, Switch, BrowserRouter, withRouter } from 'react-router-dom'
import filterBE from './components/filterBE'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path = "/" exact component={filterBE}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App