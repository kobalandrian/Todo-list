import React, { Component } from 'react';
import '../css/Nav.css';
import Calendar from 'react-calendar';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
    date: new Date(),
    menu: false    
    }  
    this.showMenu = this.showMenu.bind(this);  
  }
 
  onChange = date => this.setState({ date });
  showMenu (){
    var showme = this.state.menu === 'true' ? 'false' : 'true';
    this.setState({menu: showme});
  }
  
  render() {
    var classMenu = 'nav-list';
    if (this.state.menu === 'true') {
      classMenu = classMenu + ' show';
    };

    return (
      <div className="Nav" >
        <div className="nav-title"><span className="blue">W</span><span className="pink">e</span><span className="orange">e</span><span className="yellow">k</span><span className="green">l</span>y</div>
        <div className="btn-nav " onClick={() => this.showMenu()} >
        {/* <i class="material-icons">&#xe3c7;</i> */}
          <div className="btn-nav-line link-fiolet"></div>
          <div className="btn-nav-line link-orange "></div>
          <div className="btn-nav-line link-sea"></div>
        </div>
        <ul className={classMenu} >         
          <li className="nav-list-item blue"><NavLink className="link l-blue " exact={true} activeClassName="link-blue" to='/'> <span className="width100">Monday</span></NavLink></li>
          <li className="nav-list-item red"><NavLink className="link l-red" activeClassName="link-red" to='/tuesday'> <span className="width100">Tuesday</span></NavLink></li>
          <li className="nav-list-item fiolet"><NavLink className="link l-fiolet" activeClassName="link-fiolet" to='/wednesday'> <span className="width100">Wednesday</span> </NavLink></li>
          <li className="nav-list-item green"><NavLink className="link l-green" activeClassName="link-green" to='/thursday'> <span className="width100">Thursday</span> </NavLink></li>
          <li className="nav-list-item orange"><NavLink className="link l-orange" activeClassName="link-orange" to='/friday'> <span className="width100">Friday</span> </NavLink></li>
          <li className="nav-list-item pink"><NavLink className="link l-pink" activeClassName="link-pink" to='/saturday'> <span className="width100">Saturday</span> </NavLink></li>
          <li className="nav-list-item sea"><NavLink className="link l-sea" activeClassName="link-sea" to='/sunday'> <span className="width100">Sunday</span>  </NavLink> </li>                
        </ul> 
        <Calendar className="calendar"
          onChange={this.onChange}
          value={this.state.date}
          locale={"en-EN"}
        />
        <div className="footer"><a href="http://andriankobal.com/" className="footer-a">Designed by Andrian Kobal</a></div>      
      </div>
    );
  }
}

export default Nav;