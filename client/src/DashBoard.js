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
        this.state.showQuiz = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.removeSubject = this.removeSubject.bind(this);
        this.fetchSubjects = this.fetchSubjects.bind(this);
        this.handleQuiz = this.handleQuiz.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        if(name=='subject'){
          this.setState({subject:value});
        }
    }
    componentDidMount(){
      this.setState({isTeacher:true});
      this.fetchSubjects();
    }
    fetchSubjects(){
      let subjects = [];
      axios.get('http://localhost:5000/v1/subject').then(res=>{
        if(res.data){
          console.log(res);
          subjects = res.data.map(item=>{
            let data = {};
            data['_id'] = item._id;
            data['subjectName'] = item.subjectName;
            return data;
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
      // let subjects = this.state.subjects;
      // subjects.push(subject);
      let subjectData = {};
      subjectData['subjectName'] = subject;
      axios.post('http://localhost:5000/v1/subject/create',subjectData).then(res=>{
            this.setState({addSubject:false},()=>{
              this.fetchSubjects();
            })    
      })
    }
    removeSubject(id){
      axios.delete(`http://localhost:5000/v1/subject/delete/${id}`).then(res=>{
          this.fetchSubjects();
      })
    }
    handleQuiz(){
      this.setState({showQuiz:!this.state.showQuiz,quizText:this.state.isTeacher?'Teacher will Set the Quiz':'Student will have to answer Quiz'});
    }
    render(){
      console.log(this.state);
      let subjects = this.state.subjects;
        return (
            <div>
              
              {this.state.isTeacher == true && <Button variant="secondary" onClick={this.handleAdd}>Add</Button>}
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
                    <Modal.Header >
                      <Modal.Title>{item.subjectName}</Modal.Title>
                      <Button variant="primary" onClick={()=>this.handleQuiz(this.state.isTeacher)}>{this.state.isTeacher?'Create Quiz':'Show Quiz'}</Button>
                      {this.state.isTeacher == true &&
                        <button type="button" className="btn-close" aria-label="Close" onClick={()=>this.removeSubject(item._id)}/>
                      }
                    </Modal.Header>
                    {this.state.showQuiz &&
                      <Modal.Footer>
                        {this.state.quizText}
                      </Modal.Footer>
                    }
                  </Modal.Dialog>
                )
              })}
            </div>
        );
    }
}

export default DashBoard ;