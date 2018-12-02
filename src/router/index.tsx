import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Admin from '../admin'
import Login from '../pages/login'
import Home from '../pages/home'

import Buttons from '../pages/ui/buttons'
import NotFound from '../pages/nomatch'
const IRouter = () => {
  return (
    <Router>
      <App>
        <Switch>
          <Route
            path='/'
            render={() => (
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/ui/buttons' component={Buttons} />
                  <Route component={NotFound} />
                </Switch>
              </Admin>
            )}
          />
          <Route path="/login" component={Login} />
        </Switch>
      </App>
    </Router>
  )
}
export default IRouter
