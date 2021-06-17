import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import history from '../../history';
import dotenv from 'dotenv';

function Register() {
    const [state,setState]=useState({
        email:'',
        username:'',
        password:'',
        confirm_password:'',
    }) ;
     
     const ChangeHandler =(e)=> {
        const value=e.target.value;
        setState({...state, [e.target.name]:value});
        console.log(e.target.name);
    }

    const SubmitHandler = async (e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append('username',state.username);
        formdata.append('email',state.email);
        formdata.append('password',state.password);
        formdata.append('confirm_password',state.confirm_password);
        axios.post(`${process.env.REACT_APP_API_URL}/user/create/`,formdata)
        .then(res=>()=>{
            
            history.push("/login");

        }).catch(err=>{console.log(err)})
    }
    return (

        <div className="outer">
            <div className="inner">
            <h2>Create an account</h2>
                <Form onSubmit={(e)=>SubmitHandler(e)}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="email" onChange={(e)=>ChangeHandler(e)}/>
                    </Form.Group>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" placeholder="username" onChange={(e)=>ChangeHandler(e)}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="password" onChange={(e)=>ChangeHandler(e)}/>
                    </Form.Group>
                    
                    <Form.Group controlId="confirm_password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="confirm_password" type="password" placeholder="confirm password" onChange={(e)=>ChangeHandler(e)}/>
                    </Form.Group>
                    <Button className="btn btn-dark btn-lg btn-block" variant="hidden" type="submit">Register</Button>
                    <p className="forgot-password text-right">Already have a account
                    <span><Link to="/login">Login</Link></span>
                    </p>
                    
                </Form>
            </div>                        
        </div>
    )
}

export default Register
