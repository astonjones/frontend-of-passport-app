import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import components
import Navigation from './components/navbar.component';
// import FoodItemList from './components/foodItems-list.component';
import EditFoodItem from './components/edit-foodItem.component';
import CreateFoodItem from './components/create-foodItem.component';
import LoginForm from './components/login-form.component';
import SignUpForm from './components/sign-up.component';
import Home from './components/home';
import Header from './components/Header';

class App extends Component {

  constructor(){
    super()
    this.state = {
        loggedIn: false,
        user: null
    }
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }
  //get the data when the page loads
  componentDidMount() {
    axios.get('https://morning-brushlands-95842.herokuapp.com/user')
    .then(response => {
      console.log(response.session)
      console.log(response.data)
      if(!!response.data.user) {
        console.log('There is a USER!')
        this.setState({
          loggedIn:true,
          user: response.data.user
        })
      } else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }

  _logout(event) {
    event.preventDefault()
    console.log('logging out!')
    axios.post('https://morning-brushlands-95842.herokuapp.com/user/logout')
    .then(response => {
      console.log(response.data)
      if(response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }

  _login(username, password){
    axios.post('https://morning-brushlands-95842.herokuapp.com/user/login', {
      username,
      password
    })
    .then(response => {
      console.log(response)
      if(response.status === 200){
        //update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      }
    })
  }

  render() {
  return (
      <Router>
        <div className="container">
          <Navigation />
          <Header user={this.state.user} />
          <br />
          <Route path="/" exact render={() => <Home user={this.state.user}/>} />
          <Route path="/edit/:id" component={EditFoodItem}/>
          <Route path="/create" component={CreateFoodItem}/>
          {/* <Route path="/user" component={CreateUser} /> */}
          <Route exact path="/login" render={() => <LoginForm _login={this._login} />} />
          <Route exact path="/signup" component={SignUpForm} />
        </div>
      </Router>
  );
  }
}

export default App;
