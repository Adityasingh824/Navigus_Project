import React from 'react';
import './App.css';
import axios from "axios";

class App extends React.Component {
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
    console.log(userData);
    axios.post('http://localhost:5000/v1/user',userData).then(res=>{
      console.log(res);
    })

  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" name='name' value={this.state.name} placeholder="name" onChange={this.handleChange}/>
          <input type="text" name='email' value={this.state.email} placeholder="email"  onChange={this.handleChange}/>
          <input type="text" name='role' value={this.state.role} placeholder="role"  onChange={this.handleChange}/>
          <input type="text" name='password' value={this.state.password} placeholder="password"  onChange={this.handleChange}/>
          <button onClick = {this.handleSubmit}>Submit</button>
  
        </header>
      </div>
    );
  }
}

export default App;
