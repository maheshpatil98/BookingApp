import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddFlight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightSource: "",
            flightDestination: "",
            flightDeparture: "",
            flightArrival: "",
            flightStatus: "",
            cheems: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange = (date) => {
        this.setState({
            dob: date.toString(),
        });
    };

    onSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;
        const Post = {
            flightSource: this.state.flightSource,
            flightDestination: this.state.flightDestination,
            flightArrival: this.state.flightArrival,
            // dob: this.state.dob,
            flightDeparture: this.state.flightDeparture,
            flightStatus: this.state.flightStatus
        };
        fetch("http://localhost:7003/flights/addflight/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + id
            },
            body: JSON.stringify(Post),
        })
            .then((res) => res.json())
            .then((rems) => {
                console.log(rems);
                this.setState({ cheems: rems });
                console.log(this.state.cheems.flight);
                alert(
                    `Booked succesfully with flight ID ${this.state.cheems.flight.flightId} and flight Source ${this.state.cheems.flight.flightSource} please verify following details
              Status: ${this.state.cheems.flight.flightDestination}, first name : ${this.state.cheems.flight.flightArrival}, last name: ${this.state.cheems.flight.flightDeparture} and phone no: ${this.state.cheems.flight.flightStatus}`
                );
            });
        let path = "/search/" + this.props.match.params.id;
        this.props.history.push(path);
    }



    render() {
        let path = "/search/" + this.state.tokenn + "/" + this.props.match.params.name;
        return (
            <div className="container-sm w-90">
                <div style={{ display: "flex", flexDirection: "row", backgroundColor: "#121212", margin: "10px 10px" }}>
                    <button className="btn btn-primary" onClick={() => { this.props.history.push(path); }}>Back</button>
                </div>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Source</label>
                        <br />
                        <input
                            type="text"
                            name="flightSource"
                            required
                            className="form-control"
                            placeholder="Add a Flight Source"
                            pattern="[A-Za-z]{3,}"
                            value={this.state.flightSource}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Flight Destination</label> <br />
                        <input
                            type="text"
                            name="flightDestination"
                            className="form-control"
                            placeholder="Add Destiantion"
                            pattern="[A-Za-z]{3,}"
                            required
                            value={this.state.flightDestination}
                            onChange={this.onChange}
                        />
                    </div>

                    {/* <div className="form-group">
                <label>Date of Birth</label>
                <br />
                <DatePicker
                  locale="es"
                  dateFormat="yyyy-mm-dd"
                  selected={this.state.dob}
                  onChange={this.handleChange}
                />
              </div> */}

                    <div className="form-group">
                        <label>Flight Arrival</label> <br />
                        <input
                            type="text"
                            name="flightArrival"
                            className="form-control"
                            placeholder="Add Arrival Time"
                            required
                            value={this.state.flightArrival}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Flight Departure</label>
                        <br />
                        <input
                            type="String"
                            name="flightDeparture"
                            className="form-control"
                            placeholder="Add Departure Time"
                            required
                            value={this.state.flightDeparture}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Flight Status</label>
                        <br />
                        <input
                            type="text"
                            name="flightStatus"
                            className="form-control"
                            placeholder="Enter pre-defined status for flight"
                            required
                            value={this.state.flightStatus}
                            onChange={this.onChange}
                        />
                    </div>
                    <br />

                    <button className="btn btn-primary" type="submit">
                        Submit
              </button>
                </form>
                <br></br>
                <hr></hr>
            </div>
        );
    }
}
export default withRouter(AddFlight);
