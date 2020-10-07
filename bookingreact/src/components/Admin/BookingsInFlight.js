import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button, ButtonToolbar, Dropdown } from "react-bootstrap";
import PayDetails from './PayDetails';
import Edit from './Edit';

class BookingsInFlight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
            tokenn: this.props.match.params.id,
            isForm: false,
            propName: "Select Value",
            updateValue: "",
            newValue: "",
            bookId: "",
            dataa: [],
            payModalShow: false
        };

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    routeChangeDelete(flight) {
        console.log(flight.flightId);
        console.log(flight.userId);
        fetch("http://localhost:7003/flights/pass/delete/" + flight.userId, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.state.tokenn
            }
        })
            .then((dat) => {
                //console.log(dat);
                if (dat) {
                    alert("Data deleted Successfully");
                    window.location.reload();
                }
                else {
                    alert("Error Occured");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    componentWillMount() {
        fetch("http://localhost:7002/bookings/", {
            method: "GET"
        })
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {

                this.setState({ bookData: json.passengers });
                console.log(this.state.bookData);
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });

        fetch("http://localhost:7003/pay/getdata")
            .then(tab => tab.json())
            .then((json) => {
                this.setState({ dataa: json });
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });
    }





    getsomething() {
        return (<div></div>);
    }
    render() {

        let path = "/search/" + this.state.tokenn + "/" + this.props.match.params.name;
        let editModalClose = () => this.setState({ isForm: false });

        const BookList = this.state.bookData.map((fly) => (

            <tr key={fly._id}>
                <td> {fly.bookId}</td>
                <td> {fly.firstname}  {fly.lastname}</td>
                <td>{fly.flightID}</td>
                <td> {fly.email} </td>
                <td>{fly.Nationality}</td>
                <td> {fly.status}</td>
                <td>{fly.amount}</td>
                <td>

                    <ButtonToolbar>
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                this.setState({ isForm: true });
                                this.setState({ bookId: fly.bookId });
                            }}
                        >Update</Button>

                        <Edit
                            show={this.state.isForm}
                            onHide={editModalClose}
                            tokeen={this.props.match.params.token}
                            bookid={this.state.bookId}
                        />
                    </ButtonToolbar>
                </td>
                <td className="btn btn-outline-danger" onClick={() => this.routeChangeDelete(fly)}>
                    Delete</td>
            </tr>


        ));




        let addModalClose = () => this.setState({ payModalShow: false });
        return (
            <div>
                <hr />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary" style={{ margin: "10px 10px" }} onClick={() => { this.props.history.push(path); }}>Back</button>
                    <ButtonToolbar>
                        <Button
                            variant="outline-success"
                            onClick={() => { this.setState({ payModalShow: true }); }}
                        >Show Payment Details</Button>

                        <PayDetails
                            show={this.state.payModalShow}
                            onHide={addModalClose}
                            tokeen={this.props.match.params.token}
                            data={this.state.dataa}
                        />
                    </ButtonToolbar>
                </div>
                <hr />

                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td>Booking ID</td>
                                <td>Name</td>
                                <td>Flight</td>
                                <td>Mail</td>
                                <td>Nationality</td>
                                <td>Status</td>
                                <td>Due Amount</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>{BookList}</tbody>
                    </table>
                </div>

                {/* <div>
                        <div style={{ textAlign: "center" }}>{this.state.isForm ? this.getaform() : this.getsomething()}</div>
                    </div> */}

            </div>
        )
    }
}

export default withRouter(BookingsInFlight);
