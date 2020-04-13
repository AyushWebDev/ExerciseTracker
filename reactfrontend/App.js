import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Navbar from './main/navbar';
import UserForm from './form/userform';
import ExerciseForm from './form/exerciseForm';
import GetExercise from './getInfo/getExercise';
import EditExercise from './form/editExercise';
import Signin from './form/signin';

class App extends React.Component{
  render(){
    return(
      
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/createUser" component={UserForm}/>
          <Route exact path="/createExercise" component={ExerciseForm}/>
          <Route exact path="/exerciseList" component={GetExercise}/>
          <Route exact path="/editExercise/:id" component={EditExercise}/>
          <Route exact path="/signin" component={Signin}/>
        </Switch>
      </BrowserRouter>
      
    )
  }
}

export default App;
