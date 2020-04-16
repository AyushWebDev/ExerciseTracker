import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuthenticated , signout} from '../form/index';

const Navbar=({history})=>{
        return(
            <div style={{marginBottom: "100px"}}>
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Link to="/" className="nav-link disabled"><h5>EXERCISE TRACKER</h5></Link>
                    </li>

                    {!isAuthenticated() &&
                    <li className="nav-item">
                        <Link to="/signIn" className="nav-link">Sign In</Link>
                    </li>
                    }

                    {!isAuthenticated() &&
                    <li className="nav-item">
                        <Link to="/createUser" className="nav-link">Create User</Link>
                    </li>
                    }

                    {isAuthenticated() &&
                    <li className="nav-item">
                        <Link to="/createExercise" className="nav-link">Create Exercise</Link>
                    </li>
                    }

                    <li className="nav-item">
                        <Link to="/exerciseList" className="nav-link">Exercise List</Link>
                    </li>

                    {isAuthenticated() &&
                    <li className="nav-item">
                        <a onClick={()=>signout(()=>{history.push("/")})} className="nav-link">Sign Out</a>
                    </li>
                    }
                </ul>

            </div>
        )
    }


export default withRouter(Navbar);