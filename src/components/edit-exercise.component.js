import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercises extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('https://secret-sierra-65628.herokuapp.com/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })

        axios.get('https://secret-sierra-65628.herokuapp.com/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users:response.data.map(user => user.username),
                    })
                }
            })
    }

    //method for changing the username state
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    //method for changing the description state
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    //method for changing the duration state
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
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
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('https://secret-sierra-65628.herokuapp.com/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = '/'; //takes person back to home page
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" 
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (In minutes):</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker 
                            selection={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}