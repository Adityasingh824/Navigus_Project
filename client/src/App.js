import React from 'react';
import './App.css';
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from 'react-bootstrap';
import {Route,Link} from 'react-router-dom';
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import DashBoard from './DashBoard'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      name:"",
      email:"",
      role:"",
      password:"",
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange(e){
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   if(name=='name'){
  //     this.setState({name:value});
  //   }
  //   if(name=='email'){
  //     this.setState({email:value});
  //   }
  //   if(name=='role'){
  //     this.setState({role:value});
  //   }
  //   if(name=='password'){
  //     this.setState({password:value});
  //   }
  // }
  // handleSubmit(){
  //   let userData = {};
  //   userData['userName'] = this.state.name;
  //   userData['userEmail'] = this.state.email;
  //   userData['userType'] = this.state.role;
  //   userData['userPassword'] = this.state.password;
  //   console.log(userData);
  //   axios.post('http://localhost:5000/v1/user',userData).then(res=>{
  //     alert('Data send Successfully');
  //   })
  // }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Route exact path='/' render={({history})=>(
          <>
          {console.log(history)}
            <h1 style={{textAlign:"center"}}>Welcome</h1>
            <HomePage history={history}/>
          </>
        )}/>
        <Route exact path='/login' render={({history})=>(
          <>
            <h1 style={{textAlign:"center"}}>Welcome</h1>
            <p style={{textAlign:"center"}}>Please Login</p>
            <LoginPage history={history}/>
          </>
        )}/>
        <Route exact path='/dashboard' render={()=>(
          <>
            <DashBoard />
          </>
        )}/>
      </div>
    );
  }
}

export default App;
