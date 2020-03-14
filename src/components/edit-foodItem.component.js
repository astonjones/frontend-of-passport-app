import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditFoodItem extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            calories: '',
            date: new Date(),
            users: []
        }
    }

    //gets data when the app loads
    componentDidMount() {
        axios.get('localhost:5000/foodItems/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    calories: response.data.calories,
                    date: new Date(response.data.date)
                })
            })

        axios.get('localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users:response.data.map(user => user.username),
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

    //method for changing the calories state
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
            name: this.state.username,
            calories: this.state.calories,
            date: this.state.date
        }

        console.log(foodItem);

        axios.post('https://morning-brushlands-95842.herokuapp.com/foodItems/update/' + this.props.match.params.id, foodItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/'; //takes person back to home page
    }

    render() {
        return (
            <div>
                <h3>Edit Food Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name of Food: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}/>
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
                        <input type="submit" value="Edit FoodItem Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}