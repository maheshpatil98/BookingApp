import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

class CheckStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
            token: this.props.match.params.bookid
        };

    }


    componentWillMount() {
        // console.log(this.props.match.params.bookid);
        fetch("http://localhost:7002/bookings/get/status/" + this.state.token, {
            method: "GET"
        })
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {
                this.setState({ bookData: json });
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });
    }

    render() {
        let path = "/flights";
        const BookList = this.state.bookData.map((fly) => (
            <div className="card" style={{ width: "38rem" }}>
                <div className="card-body" style={{ textAlign: "center", alignContent: "center", alignItems: "center" }}>
                    <h5 className="card-title">Flight Number: {fly.flightID}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Flight</h6>
                    <p className="card-text">Booking ID: {fly.bookId}</p>
                    <p className="card-text">Full Name: {fly.firstname}  {fly.lastname}</p>
                    <p className="card-text">Number: {fly.number}  Nationality: {fly.Nationality}</p>
                    <p className="card-text">Flight Status: {fly.status}</p>

                    <button className="btn btn-primary" style={{ width: "38%" }}> Pay</button>
                </div>
            </div>
        ));

        return (
            <div>
                <div className="container d-flex justify-between" style={{ backgroundColor: "gray" }}>
                    <button className="btn btn-primary" >Timepass</button>
                    <button className="btn btn-primary" style={{ float: "right" }} onClick={() => { this.setState({ token: "" }); this.props.history.push(path); }} >Logout</button>

                </div>

                <div className="d-flex justify-between">

                    <div>

                    </div>

                    <div>
                        <div className="container-s" style={{ float: "right" }}>
                            {BookList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CheckStatus)
