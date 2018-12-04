import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Admin from '../admin'
import Login from '../pages/login'
import Home from '../pages/home'

import Buttons from '../pages/ui/buttons'
import Modals from '../pages/ui/modals'
import Loading from '../pages/ui/loading'
import Notice from '../pages/ui/notice'
import Message from '../pages/ui/message'
import Tabs from '../pages/ui/tabs'
import FormLogin from '../pages/form/login'
import FormRegister from '../pages/form/register'
import basicTable from '../pages/table/basicTable'
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
                  <Route path='/ui/modals' component={Modals} />
                  <Route path='/ui/loadings' component={Loading} />
                  <Route path='/ui/notification' component={Notice} />
                  <Route path='/ui/messages' component={Message} />
                  <Route path='/ui/tabs' component={Tabs} />
                  <Route path='/form/login' component={FormLogin} />
                  <Route path='/form/reg' component={FormRegister} />
                  <Route path='/table/basic' component={basicTable} />
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
