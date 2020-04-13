import React from 'react';
import axios from 'axios';

class UserForm extends React.Component{
    constructor(){
        super();
        this.state={
            username: "",
            email: "",
            password: "",
            open: false,
            error: ""
        }
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value
        })
    };

    onSubmit=(event)=>{
        event.preventDefault();
        const {username,email,password}=this.state;
        const user={
            username,
            email,
            password
        }

        axios.post("http://localhost:5000/user/add",user)
        .then(res=>{
            if(res.data.error)
            {
                console.log("error",res.data.error);
                this.setState({
                    error: res.data.error
                })
            }
            else{
                console.log(res.data);

                this.setState({
                    username: "",
                    email: "",
                    password: "",
                    open: true
                })

                
            }
        });

       
        
    }

    render(){
        const isOpen=this.state.open;
        const err=this.state.error;
        return(
            <>
            
           
            <div className="container">
                <div className="col-md-4"></div>
               

                <div className="col-md-4">
                    {isOpen && 
                        <div className="container alert alert-success">
                        
                            <h2>New User Added</h2>
                        
                        </div>
                    }

                    {err &&
                    <div className="container alert alert-danger">
                         
                            <h6>{err}</h6>
                        
                    </div>
                    }           
                    
                    <form style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
                    <h2>Create User</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.handleChange("username")}/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter Email" onChange={this.handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter Password" onChange={this.handleChange("password")}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={this.onSubmit} className="btn btn-primary btn-raised"> 
                                SIGN UP
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
            </>
        )
    }

}

export default UserForm;