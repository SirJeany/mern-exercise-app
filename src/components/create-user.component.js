import React, { Component } from 'react';

export default class CreateUser extends Component {
    constructor(props) {
        super(props); // all js constructors start with a super function call.

        // Currently the program wont know what 'this' is inside the methods.
        // What the following does: Binds the methods.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }

    }

    // Now we code some methods that will change the state, ie update something on the database but reflect changes on the front end.

    // Method to edit a uers name:
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // Add a method to submit the form:
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log("New User created: ", user);

        // Navigate user back to same page:
        this.setState({
            username: ''
        })
    }
    

    render() {
        return (
            <div className="container">
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                        value="Create User"
                        className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}