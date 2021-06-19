import React, { Component} from 'react'
import { useHistory,BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import Home from '../Home/Home';
import Cookies from 'js-cookie';
import { render } from 'react-dom';
import './login.css';
import history from '../../history';
import UserContext from '../../UserContext';
import dotenv from 'dotenv';

 class Login extends Component {

    static contextType=UserContext

    constructor(props){
        super(props);

        this.state={
            id:'',
            username:'',
            password:'',
        };
    }

    setDetail =()=>{
        const user =this.context;
        user.getUserDetail();
    }


     ChangeHandler =(e)=> {
        const value=e.target.value;
        this.setState({...this.state, [e.target.name]:value});
    }

     SubmitHandler = async (e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('username',this.state.username);
        formdata.append('password',this.state.password);
        console.log(process.env);
        let res = await fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
            body: formdata,
            method: 'POST',
        });

        if (res.ok) {
            let response = await res.json();
            Cookies.set('auth_token',response['token']);
            this.setDetail();
            history.push(`/app`);
        } else {
            let error = await res.json();
            console.log(error);

        }
        
    }
    render() {
        return (
            <Container className="outer">
                        <div className="inner">
                            <Form onSubmit={(e)=>this.SubmitHandler(e)}>
                                <h2>Login</h2>
                                <Form.Group controlId="username" className="form-group">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="name" 
                                                    placeholder="username" 
                                                    className="form-control" onChange={(e)=>this.ChangeHandler(e)}/>
                                </Form.Group>

                                <Form.Group controlId="password" className="form-group">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password"  type="password"
                                     placeholder="password" className="form-control"
                                      onChange={(e)=>this.ChangeHandler(e)}/>
                                </Form.Group>
                                
                                <Button className="btn btn-dark btn-lg btn-block" variant="hidden" type="submit">Login</Button>
                                <p className="forgot-password text-right">Already have a account
                                <span><Link to="/register">Register</Link></span>
                                </p>
                            </Form>
                        </div>                        
                </Container>
        )
    }
}

export default Login
