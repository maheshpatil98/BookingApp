import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
      cheems: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onHandleChange(e) {
    this.setState({ role: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const Post = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    fetch("http://localhost:7003/users/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Post),
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        this.setState((this.state.cheems = rems));
        console.log(this.state.cheems);
      });
  }

  render() {
    return (
      <div className="container-sm w-25">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email </label>
            <input
              type="text"
              name="email"
              required
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div>
            <label>First Name </label>
            <input
              type="text"
              name="firstName"
              required
              className="form-control"
              placeholder="First Name"
              pattern="[A-Za-z]{3,}"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>last Name </label>
            <input
              type="text"
              name="lastName"
              pattern="[A-Za-z]{3,}"
              required
              className="form-control"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="text"
              name="password"
              className="form-control"
              placeholder="Password"
              pattern=".{7,}"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <br />

          <div>
            <label>
              Select User :
              <select value={this.state.value} onChange={this.onHandleChange}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
          </div>

          <br />
          <button className="btn btn-success" type="submit">
            Done
          </button>
        </form>
        <hr />
        <div>
          <h3>{this.state.cheems.message}</h3>
        </div>
      </div>
    );
  }
}

export default Signup;
