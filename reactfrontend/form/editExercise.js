import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Editexercise extends React.Component{
    constructor(){
        super();
        this.state={
            username: "",
            description: "",
            duration: "",
            users: [],
            Redirectto: false
        }
    }

    componentDidMount(){

        axios.get("http://localhost:5000/user/")
        .then(res=>{
            this.setState({
                users: res.data
            })
        })
    

        axios.get(`http://localhost:5000/exercise/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                username: res.data.username,
                description: res.data.description,
                duration: res.data.duration
            })
            
        })
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value
        })
    }

    onSubmit=(event)=>{
        event.preventDefault();
        const {username,description,duration}=this.state;

        const Newexercise={
            username,
            description,
            duration
        };

        axios.post(`http://localhost:5000/exercise/update/${this.props.match.params.id}`,Newexercise)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        });

        this.setState({
            Redirectto: true
        })

    }
   

    render(){
        const {Redirectto}=this.state;
        if(Redirectto)
            return <Redirect to="/"/>
        
        
        
        return(
            <>
            
            <div className='container'>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                
                <form style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
        <h2>Update {`${this.state.username}'s`} Exercise</h2>
                    <div className="form-group">
                        <label className="text-muted">Choose Username</label>
                        <select placeholder="Choose Username" className="form-control" onChange={this.handleChange("username")} value={this.state.username}>
                            {this.state.users.map(user=>{
                            return <option>{user.username}</option>
                            })}
                        </select>
                    </div>
                        
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("description")} placeholder="Enter description" value={this.state.description}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.handleChange("duration")} placeholder="Enter duration" value={this.state.duration}/>
                        </div>
                        <div className="form-group">
                            <button onClick={this.onSubmit} className="btn btn-primary btn-raised">Submit</button>
                        </div>
                    
                </form>
                </div>
            </div>
            </>
        )
    }
}

export default Editexercise;