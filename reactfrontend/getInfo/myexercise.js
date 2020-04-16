import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

class MyExercise extends React.Component{
    constructor(){
        super();
        this.state={
            exercises: []
        }
    }

    getExercise=()=>{
        axios.get(`http://localhost:5000/exercise/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                exercises: res.data
            })
        })
        .catch(error=>console.log(error));
    }

    componentDidMount(){
        this.getExercise();
    }

    deleteExercise=id=>event=>{
        event.preventDefault();
        axios.delete(`http://localhost:5000/exercise/${id}`)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        });

        this.getExercise();
    }


    render(){
        return(
        <div className="container">
            <div className="col-md-1"></div>
            <div className="col-md-11" style={{border: "1px solid",padding : "30px", boxShadow: "5px 5px 10px"}}>
            <h3 style={{textAlign: "center"}}>Exercises</h3>
                <div className="row" style={{color: "white"}}>
                    <div className="col-md-3 bg-dark">Username</div>
                    <div className="col-md-3 bg-dark">Description</div>
                    <div className="col-md-3 bg-dark">Duration (min)</div>
                    <div className="col-md-3 bg-dark">Actions</div>
                </div>

                {this.state.exercises.map(exercise=>{
                           
                           return(
                                   <div className="row" style={{padding: "10px"}}>
                                   <div className="col-md-3">{exercise.username.toUpperCase()}</div>
                                   <div className="col-md-3">{exercise.description.toUpperCase()}</div>
                                   <div className="col-md-3">{exercise.duration}</div>
                                   <div className="col-md-3">
                                       <Link to={`/editExercise/${exercise._id}`} className="btn btn-success btn-raised">Edit</Link>
                                       <button className="btn btn-danger btn-raised" onClick={this.deleteExercise(exercise._id)}>Delete</button>
                                   </div>
                                   </div>
                           );
                       })}
            </div>
        </div>
        )
    }
}

export default MyExercise;