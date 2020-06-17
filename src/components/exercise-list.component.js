import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        // Bind methods:
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:8080/exercises')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        exercises: res.data // get all exercise info
                    })
                }
            })
            .catch((err) => console.log("Error getting all exercises from the backend: ", err));
    }

    // Delete method:
    deleteExercise(id) {
        axios.delete('http://localhost:8080/exercises' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(`Error sending accross info to delete exercise (id = ${id}): `, err));
        
        this.setState({
            exercises: this.state.exercises.filter(el => el._id != id)
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}