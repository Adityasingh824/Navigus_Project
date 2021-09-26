import React from 'react';
import {Form,Button} from 'react-bootstrap';
import {Route,Link} from 'react-router-dom';
import axios from "axios";

class LoginPage  extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name=='email'){
          this.setState({email:value});
        }
        if(name=='password'){
          this.setState({password:value});
        }
    }

    handleSubmit(){
        let userData = {};
        userData['userEmail'] = this.state.email;
        userData['userPassword'] = this.state.password;
        axios.post('http://localhost:5000/v1/user/login',userData).then(res=>{
          console.log(res.data);
          if(res.data){
            if(res.data.userType == 'Teacher'){
              this.props.history.push(`/dashboard?isTeacher=1&name=${res.data.userName}`)
            }else{
              this.props.history.push(`/dashboard?isTeacher=0&name=${res.data.userName}`)
            }
          }
        });
    }

    render(){
        return (
            <header className="App-header">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name='email' value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name='password' value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" onClick = {this.handleSubmit}>
                    Login
                    </Button>
                    <p>New User? <Link to='/'>Create Account</Link></p>
                </Form>
            </header>
        );
    }
}

export default LoginPage ;