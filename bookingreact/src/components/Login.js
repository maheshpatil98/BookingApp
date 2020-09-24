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
    console.log(e);
    JSON.stringify(e);
    let path = "/search/" + e.token + "/" + e.newuser.firstName;
    this.props.history.push(path);
  };

  onSubmit(e) {
    e.preventDefault();
    const Post = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:7003/users/passenger/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Post)
    })
      .then(ress => ress.json())
      .then((rems) => {

        console.log(rems);
        alert(`message: ${rems.message}`);
        this.setState({ cheems: rems });
        this.routeChange(rems);
      });
  }

  render() {


    return (
      <div className="container-sm w-25">
        <br />
        <hr />
        <form className="card w-30 mr-auto" style={{ textAlign: "center", width: "18rem" }} onSubmit={this.onSubmit}>
          <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
            <h5 className="card-title">Welcome Admin</h5>
            <h6 className="card-subtitle mb-2 text-muted">Please Login </h6>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={this.state.email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                pattern=".{7,}"
                placeholder="Enter Password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <br />
            <button className="btn btn-success" id="testForText" type="submit">
              Done
          </button>
          </div>
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
