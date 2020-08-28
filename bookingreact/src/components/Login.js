import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      cheems: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //remaining
  routeChange = (e) => {
    console.log(e.token);
    let path = "/search/" + e.token;
    this.props.history.push(path);
  };

  onSubmit(e) {
    e.preventDefault();
    const Post = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:7003/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Post)
    })
      .then((res) => res.json())
      .then((rems) => {
        console.log(rems);
        alert(`message: ${rems.message}`);
        this.setState((this.state.cheems = rems));
        this.routeChange(rems);
      });
  }

  render() {

    //  console.log(this.props.pao.loggedIn);
    return (
      <div className="container-sm w-25">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <br />
          <button className="btn btn-success" type="submit">
            Done
          </button>
        </form>
        <hr />
        <div>
          <h3>{this.state.cheems.message}</h3>
          <p>{this.state.cheems.token}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
