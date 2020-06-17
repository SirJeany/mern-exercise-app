import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
    constructor(props) {
        super(props); // all js constructors start with a super function call.
        this.userInputRef = React.createRef(); // No idea why this makes it work.. React likes you to declare ref values this way

        // Currently the program wont know what 'this' is inside the methods.
        // What the following does: Binds the methods.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // componentDidMount: A react lifecycle method that gets called right before anything displays on the page:
    // So lets use it to hardcode a user for testing:
    componentDidMount() {
        // this.setState({
        //     users: ['Test User'],
        //     username: 'Test User'
        // });

        // For real data:
        axios.get('http://localhost:8080/users')
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map( user => user.username ),
                        username: res.data[0].username
                    });
                }
            })
            .catch(err => console.log("Error getting all users from backend: ", err));
    }

    // Now we code some methods that will change the state, ie update something on the database but reflect changes on the front end.

    // Method to edit a uers name:
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Method to edit a description:
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    // Method to edit the duration:
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    // Method to edit the date:
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    // Add a method to submit the form:
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log("New exerise data: ", exercise);

        // Using axios we will send the new data to the backend to be changed.
        axios.post('http://localhost:8080/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log("Error updating exercise: ", err));

        window.location = '/';
    }


    render() {
        return (
            <div className="container">
                <h3>Create new Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref={this.userInputRef} 
                        required 
                        className="form-control" 
                        value={this.state.username} 
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option 
                                        key={user}
                                        value={user}>
                                            {user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <div>
                            <label>Date:</label>
                            <DatePicker selected={this.state.date}
                            onChange={this.onChangeDate} 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <input type="submit"
                        value="Create Exercise Log"
                        className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}