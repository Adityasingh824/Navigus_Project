import React from 'react';
import {Form,Button,Dropdown} from 'react-bootstrap';
import {Route,Link} from 'react-router-dom';
import axios from "axios";
//import {useHistory} from 'react-router-dom';

//let history = useHistory();

class HomePage extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            role:"",
            password:"",
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name=='name'){
          this.setState({name:value});
        }
        if(name=='email'){
          this.setState({email:value});
        }
        if(name=='role'){
          this.setState({role:value});
        }
        if(name=='password'){
          this.setState({password:value});
        }
    }

    handleSubmit(){
        let userData = {};
        userData['userName'] = this.state.name;
        userData['userEmail'] = this.state.email;
        userData['userType'] = this.state.role;
        userData['userPassword'] = this.state.password;
        let isTeacher = this.state.role == 'Teacher' ? 1 : 0;
        let request = {
            method:'POST',
            url:'http://localhost:5000/v1/user',
            data:userData
        }
        axios(request).then(res=>{
            if(res.data){
                this.props.history.push(`/dashboard/?isTeacher=${isTeacher}&name=${this.state.name}`);
            }
        }).catch(e=>console.log(e));
    }

    render(){
        console.log(this.props.history);
        return (
            <header className="App-header">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' value={this.state.name} placeholder="Enter name" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name='role' value={this.state.role} placeholder="Enter role" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" onClick = {this.handleSubmit}>
                    Submit
                    </Button>
                    <p>Already Have an Account? <Link to='/login'>Login</Link></p>
                </Form>
            </header>
        );
    }
}

export default HomePage;