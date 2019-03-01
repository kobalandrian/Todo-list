import React, { Component } from 'react';
import '../css/Header.css';
import { Route, Switch } from 'react-router';
import Monday from './Monday';
import Tuesday from './Tuesday';
import Wednesday from './Wednesday';
import Thursday from './Thursday';
import Friday from './Friday';
import Saturday from './Saturday';
import Sunday from './Sunday';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h2 className="header-title">T<span className="red">o</span>-<span className="blue">D</span>o <span className="orange">L</span><span className="red">i</span><span className="yellow">s</span><span className="red">t</span><span className="orange"> !</span></h2>
          <div className="hr"></div>
          <Switch>
            <Route exact path='/' component={Monday} />
            <Route path='/tuesday' component={Tuesday} />
            <Route path='/wednesday' component={Wednesday} />
            <Route path='/thursday' component={Thursday} />
            <Route path='/friday' component={Friday} />
            <Route path='/saturday' component={Saturday} />
            <Route path='/Sunday' component={Sunday} />
          </Switch> 
      </div>
    );
  }
}

export default Header;