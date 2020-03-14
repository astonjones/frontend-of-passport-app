import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//fooditems are commented out for now
// const FoodItem = props => (
//     <tr>
//         <td>{props.foodItem.name}</td>
//         <td>{props.foodItem.calories}</td>
//         <td>{props.foodItem.date.substring(0,10)}</td>
//         <td>
//             <Link to={"/edit/" + props.foodItem._id}>edit</Link> | <a href="#" onClick={() => { props.deleteFoodItem(props.foodItem._id) }}>Delete</a>
//         </td>
//     </tr>
// )

export default class FoodItemsList extends Component {
//     constructor(props){
//         super(props);

//         this.deleteFoodItem = this.deleteFoodItem.bind(this);

//         this.state = { foodItems: [] };
//     }

//     //gets data when application loads up
//     componentDidMount() {
//         axios.get('https://morning-brushlands-95842.herokuapp.com/foodItems/')
//             .then(res => {
//                 this.setState({ foodItems: res.data })
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     //function to delete food Items
//     deleteFoodItem(id) {
//         axios.delete('https://morning-brushlands-95842.herokuapp.com/foodItems/' + id)
//             .then(res => console.log(res.data))
//             .catch(err => console.log(err));

//         this.setState({
//             foodItems: this.state.foodItems.filter(el => el._id !== id)
//         })
//     }

//     //creates array of food items
//     foodItemsList() {
//         return this.state.foodItems.map(currentFoodItem => {
//             return <FoodItem foodItem={ currentFoodItem } deleteFoodItem={this.deleteFoodItem} key={currentFoodItem._id}/>;
//         })
//     }

    render() {
        return (
            <div>
                <h3>Logged Foods</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* { this.foodItemsList() } */}
                    </tbody>
                </table>
            </div>
        )
    }
}