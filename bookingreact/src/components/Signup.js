import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",

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

    const nPost = {
      email: this.state.email,
      password: this.state.password,
    }
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
        alert("Created Admin Succesfully")
        fetch("http://localhost:7003/users/passenger/login", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(nPost)
        })
          .then(ress => ress.json())
          .then((rems) => {

            console.log(rems);
            alert(`message: ${rems.message}`);
            this.setState({ cheems: rems });
            let path = "/search/" + rems.token + "/" + rems.newuser.firstName;
            this.props.history.push(path);
          })
          .catch((err) => {
            console.log(err);
            alert(`error occured ${err}`)
          })
      })
      .catch((err) => {
        console.log(err);
        alert(`error occured ${err}`)
      })

  }

  render() {
    return (

      <div className="container-sm w-25">
        <br />

        <form className="card mr-auto" style={{ textAlign: "center", width: "22rem" }} onSubmit={this.onSubmit} >
          <div className="card-body " style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
            <h5 className="card-title">Begin your Journey</h5>
            <h6 className="card-subtitle mb-2 text-muted">Sign up</h6>
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
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                pattern=".{7,}"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <br />

            <br />
            <button className="btn btn-success" type="submit">
              Sign up
          </button>
          </div>
        </form>
        <hr />
        <div>
          <h3>{this.state.cheems.message}</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);

/**
 * let path = "/search/" + rems.token + "/" + rems.newuser.firstName;
        this.props.history.push(path);
 */