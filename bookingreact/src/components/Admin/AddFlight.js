import React, { Component } from 'react';
import { Dropdown, Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { addflight } from "../../actions/postAction";
import PropTypes from "prop-types";

class AddFlight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flightSource: "",
            flightDestination: "",
            flightDeparture: "",
            flightArrival: "",
            flightDepartureTime: "",
            flightArrivalTime: "",
            flightStatus: "SET STATUS",
            amount: 0,

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }



    onSubmit(e) {

        e.preventDefault();

        const id = this.props.tokeen;
        const postData = {
            flightSource: this.state.flightSource,
            flightDestination: this.state.flightDestination,
            flightArrival: this.state.flightArrival + " " + this.state.flightArrivalTime,
            amount: this.state.amount,
            flightDeparture: this.state.flightDeparture + " " + this.state.flightDepartureTime,
            flightStatus: this.state.flightStatus
        };
        //post flight which i moved in postAction
        try {
            this.props.addflight(postData, id);
            alert("Added SUccesfully")
            let path = "/search/" + this.props.match.params.id + "/" + this.props.match.params.name;
            this.props.history.push(path);
        }
        catch (err) {
            console.log(err);
            alert("Error Occured !")
        }




    }



    render() {
        let path = "/search/" + this.state.tokenn + "/" + this.props.match.params.name;
        const { to, staticContext, ...props } = this.props;
        //console.log(...props);
        return (
            <div className="container" style={{ width: "23rem" }}>
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

                    <div className="form-group">
                        <label>Price per passenger</label>
                        <br />
                        <input
                            type="number"
                            name="amount"
                            className="form-control"
                            placeholder="Price for journey"
                            required
                            value={this.state.amount}
                            onChange={this.onChange}
                        />
                    </div>

                    <label> Flight Arrival</label> <br />
                    <div className="form-group d-flex justify-content-between">

                        <input
                            type="date"
                            name="flightArrival"
                            className="form-control"
                            placeholder="Add Arrival Time"
                            required
                            value={this.state.flightArrival}
                            onChange={this.onChange}
                        />

                        <input
                            type="time"
                            name="flightArrivalTime"
                            className="form-control"
                            placeholder="Add Arrival Time"
                            required
                            value={this.state.flightArrivalTime}
                            onChange={this.onChange}
                        />
                    </div>

                    <label>Flight Departure</label>
                    <br />
                    <div className="form-group d-flex">

                        <input
                            type="date"
                            name="flightDeparture"
                            className="form-control"
                            placeholder="Departure Date"
                            required
                            value={this.state.flightDeparture}
                            onChange={this.onChange}
                        />

                        <input
                            type="time"
                            name="flightDepartureTime"
                            className="form-control"
                            placeholder="Departure Time"
                            required
                            value={this.state.flightDepartureTime}
                            onChange={this.onChange}
                        />
                    </div>


                    <Dropdown >
                        <Dropdown.Toggle variant="light" id="dropdown-basic" >
                            {this.state.flightStatus}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { this.setState({ flightStatus: "ARRIVED" }); }}>ARRIVED</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ flightStatus: "NOT ARRIVED" }); }}>NOT ARRIVED</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />

                    <button className="btn btn-primary" type="submit">
                        Submit
              </button>
                </form>
            </div>);
    }
}



export default connect(null, { addflight })(withRouter(AddFlight));

/**
 *
 *
 *
 *
 *
 */
