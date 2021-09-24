import React from 'react';
import {Form,Button,Card,Modal} from 'react-bootstrap';
import {Route,Link} from 'react-router-dom';
import axios from "axios";

class DashBoard  extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            role:"",
            password:"",
            subject:'',
          }
        this.state.addSubject = false;
        this.state.subjects = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name=='subject'){
          this.setState({subject:value});
        }
    }
    componentDidMount(){
      let subjects = [];
      axios.get('http://localhost:5000/v1/subject').then(res=>{
        if(res.data){
          subjects = res.data.map(item=>{
            return item.subjectName;
          })
        }
        this.setState({subjects:subjects});
      })
    }
    handleSubmit(){
        let userData = {};
        userData['userName'] = this.state.name;
        userData['userEmail'] = this.state.email;
        userData['userType'] = this.state.role;
        userData['userPassword'] = this.state.password;
        console.log(userData);
        axios.post('http://localhost:5000/v1/user',userData).then(res=>{
          alert('Data send Successfully');
        })
    }
    handleAdd(){
      this.setState({addSubject:!this.state.addSubject})
    }
    handleSubject(){
      let subject = this.state.subject;
      let subjects = this.state.subjects;
      subjects.push(subject);
      let subjectData = {};
      subjectData['subjectName'] = subject;
      axios.post('http://localhost:5000/v1/subject/create',subjectData).then(res=>{
          console.log(res);
      })
      this.setState({subjects:subjects,addSubject:false});
    }
    render(){
      console.log(this.state);
      let subjects = this.state.subjects;
        return (
            <div>
              
              <Button variant="secondary" onClick={this.handleAdd}>Add</Button>
              {this.state.addSubject &&
                <header className="DashBoard-header">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control type="text" name='subject' value={this.state.subject} placeholder="Subject" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubject}>Submit</Button>
                  </Form>
                </header>
              }
              {this.state.subjects.map(item=>{
                return(
                  <Modal.Dialog>
                    <Modal.Header closeButton>
                      <Modal.Title>{item}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      
                    </Modal.Footer>
                  </Modal.Dialog>
                )
              })}
            </div>
        );
    }
}

export default DashBoard ;