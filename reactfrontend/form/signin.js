import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {authenticate} from '../form/index';

class Signin extends React.Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            error: "",
            open: false,
            redirect: false
        }
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value,
            error: ""
        })
    }

    onSubmit=event=>{
        event.preventDefault();
        const {email,password}=this.state;
        const user={
            email,
            password
        }
        axios.post("http://localhost:5000/user/signin",user)
        .then(res=>{
            if(res.data.error)
            {
                this.setState({
                    error: res.data.error
                })
                console.log(res.data)
            }
            else{
                authenticate(res.data,()=>{
                    this.setState({
                        email: "",
                        password: "",
                        open: true,
                        redirect: true
                    })
                });
                
                console.log(res.data);
            }
        })
        .catch(err=>console.log(err));
        
    }

    render(){
        if(this.state.redirect)
           return <Redirect to="/"/>
        

        return(
            <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    {this.state.error && 
                        <div className="alert alert-danger">
                            {this.state.error}
                        </div>
                    }
                    {this.state.open &&
                        <Redirect to="/"/>
                    }
                    <form>
                        <h2>Sign In</h2>
                        <div className="form-group">
                            <input className="form-control" type="email" onChange={this.handleChange("email")} placeholder="Enter Email"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" onChange={this.handleChange("password")} placeholder="Enter Password"/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-raised" type="submit" onClick={this.onSubmit}>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signin;