import React, { Component } from 'react';
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Register from './components/Register/Register';
import Login from './components/Login/Login'; 
import Main from './Main';
import './App.css';
import Home from './components/Home/Home';
import PrivateRoute from './Routing/PrivateRoute';
import PublicRoute from './Routing/PublicRoute';
import { Redirect, Route, Router, Switch ,useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import history from './history';
import Compiler from './components/Compiler/Compiler';
import Todo from './components/Todo/Todo'
import Calculator from './components/calculator/Calculator';
import Stackoverflow from './components/Stackoverflow/Stackoverflow';
import AsciChart from './components/Asci-chart/AsciChart';
import WhiteBoard from './components/whiteboard/WhiteBoard';
import UserContext from './UserContext';
import Cookies from 'js-cookie';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { VscAccount } from "react-icons/vsc";
import {BsGearFill, BsArrowBarRight} from 'react-icons/bs';



 class App extends Component {

  constructor(props){
    super(props);

    this.state={
      id:'',
      username:'',
      isOpen:false,
    }
  }

  logout =()=>{
    Cookies.remove('auth_token');
    this.state={
      id:'',
      username:'',
      isOpen:false,
    }
    history.push("/login");
    
  }

  toggle =()=>{
    this.setState({isOpen:(!this.state.isOpen)});
  }

  componentDidMount(){
    this.getUserDetail();
  }

  getUserDetail =async ()=>{
    let res = await fetch(`${process.env.REACT_APP_API_URL}/user/detail/`, {
            method: 'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });

        if (res.ok) {
            let response = await res.json();
            this.setState({...this.user,id:`${response['id']}`});
            this.setState({...this.user,username:response['username']});

        } else {
            let error = await res.json();
            console.log(error);

        }
  }


  render() {
    return (
      
      <Router history={history}>
    <div className="App">
    <Navbar color="light" light expand="md">
          <h2>ProTool</h2>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {Cookies.get('auth_token')?
            <Nav className="ml-auto">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Log Out</Tooltip>}>
                    <Button variant="hidden-profile" onClick={this.logout}>
                        <BsArrowBarRight size={24} />
                    </Button>
                </OverlayTrigger>
            </Nav>
            :
              <Nav className="ml-auto " navbar>
                <NavItem>
                  <NavLink href="/login/">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>       
              </Nav>
              }
            
            <VscAccount/>
            <NavbarText>{Cookies.get('auth_token')?this.state.username:"user"}</NavbarText>
          </Collapse>
        </Navbar>
        
      <UserContext.Provider value={{user:this.state,getUserDetail:this.getUserDetail}}>
        <Switch>
            <PublicRoute exact path='/' component={Main} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />
              <PrivateRoute exact restricted ="true" path="/todo" component={Todo}/>
              <PrivateRoute exact restricted ="true" path="/compiler" component={Compiler}/>
              <PrivateRoute exact restricted ="true" path="/calculator" component={Calculator}/>
              <PrivateRoute exact restricted ="true" path="/stackoverflow" component={Stackoverflow}/>
              <PrivateRoute exact restricted ="true" path="/asci_chart" component={AsciChart}/>
              <PrivateRoute exact restricted ="true" path="/app" component={Home}/>
              <PrivateRoute exact restricted ="true" path="/white_board" component={WhiteBoard}/>    
        </Switch>
      </UserContext.Provider>
    </div></Router>
    )
  }
}

export default App
