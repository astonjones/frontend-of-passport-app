import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateFoodItem extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //instantiates the state
        this.state = {
            name: '',
            calories: '',
            date: new Date(),
            users: []
        }
    }

    //gets info when app first loads
    componentDidMount() {
        axios.get('https://morning-brushlands-95842.herokuapp.com/user/') //gets from API url
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users:response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    //method for changing the name state
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    //method for changing the description state
    onChangeCalories(e) {
        this.setState({
            calories: e.target.value
        });
    }

    //method for changing the date
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    //method for submitting the form
    onSubmit(e) {
        e.preventDefault();
        
        //only use variable if they are going to stay in that method
        //initialize variable 
        const foodItem = {
            name: this.state.name,
            calories: this.state.calories,
            date: this.state.date
        }

        console.log(foodItem);

        axios.post('https://morning-brushlands-95842.herokuapp.com/foodItems/add', foodItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/'; //takes person back to home page
    }

    render() {
        return (
            <div>
                <h3>Add FoodItem</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name of Food: </label>
                        {/* <select ref="userInput" 
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}>
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select> */}
                            <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label>Amount of Calories: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.calories}
                            onChange={this.onChangeCalories}/>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker 
                            selection={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create FoodItem Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}