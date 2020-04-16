import React from 'react';
import axios from 'axios';

class ExerciseForm extends React.Component{
    constructor(){
        super();
        this.state={
            username: "",
            description: "",
            duration: "",
            postedby: {},
            created: false
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:5000/user/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                username: res.data.username,
                postedby: res.data
            })
        })
    }

    handleChange=name=>event=>{
        this.setState({
            [name]: event.target.value
        })
    };

    onSubmit=event=>{
        event.preventDefault();
        const {username,description,duration,postedby}=this.state;

        const exercise={
            username,
            description,
            duration,
            postedby
        };

        axios.post(`http://localhost:5000/exercise/add/${this.props.match.params.id}`,exercise)
        .then(res=>console.log(res.data));

        this.setState({
            username: "",
            description: "",
            duration: "",
            open: true
        })
          
    }

    render(){
        const isOpen=this.state.open;
        return(
            <>
           
            <div className='container'>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                {isOpen &&
                    <div className="container alert alert-success">
                    
                        <h2>New Exercise Added</h2>
                    
                    </div>
                }
                
                <form style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
                <h2>Create Exercise</h2>
                    {/* <div className="form-group">
                        <label className="text-muted">Choose Username</label>
                        <select className="form-control" onChange={this.handleChange("username")} value={this.state.username}>
                            {this.state.users.map(user=>{
                            return <option>{user.username}</option>
                            })}
                        </select>
                    </div> */}
                        
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

export default ExerciseForm