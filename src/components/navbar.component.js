import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <Link to="/" className="navbar-brand">ExerciseTracker</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="navbar-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="navbar-link">Create user</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}