import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Admin from '../admin';
import Login from '../pages/login';
import Home from '../pages/home';

import Buttons from '../pages/ui/buttons';
import Modals from '../pages/ui/modals';
import Loading from '../pages/ui/loading';
import Notice from '../pages/ui/notice';
import Message from '../pages/ui/message';
import Tabs from '../pages/ui/tabs';
import FormLogin from '../pages/form/login';
import FormRegister from '../pages/form/register';
import basicTable from '../pages/table/basicTable';
import highTable from '../pages/table/highTable';
import City from '../pages/city';
import Order from '../pages/order';
import Common from '../common';
import OrderDetail from './../pages/order/detail'
import Rich from './../pages/rich'
import NotFound from '../pages/nomatch';
const IRouter = () => {
  return (
    <Router>
      <App>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/common"
            render={() => (
              <Common>
                <Switch>
                  <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                </Switch>
              </Common>
            )}
          />
          <Route
            path="/"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loading} />
                  <Route path="/ui/notification" component={Notice} />
                  <Route path="/ui/messages" component={Message} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/form/login" component={FormLogin} />
                  <Route path="/form/reg" component={FormRegister} />
                  <Route path="/table/basic" component={basicTable} />
                  <Route path="/table/high" component={highTable} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/rich" component={Rich} />
                  <Route component={NotFound} />
                </Switch>
              </Admin>
            )}
          />
        </Switch>
      </App>
    </Router>
  );
};
export default IRouter;
