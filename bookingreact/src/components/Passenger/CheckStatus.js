import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Button, ButtonToolbar, Dropdown } from "react-bootstrap";
import jsPDF from "jspdf";
import Edit from './Edit';
import NewFlight from './NewFlight';

class CheckStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
            token: this.props.match.params.bookid,
            isForm: false,
            propName: "", updateValue: "SELECT VALUE",
            newValue: "",
            isEdit: false,
            flightData: [{}],
            source: "",
            destination: "",
            showlists: false,
            data: [],
            bookId: "",
            amount: 0
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.displayRazorpay = this.displayRazorpay.bind(this);
        this.intheEnd = this.intheEnd.bind(this);
    }

    // This function Updates the property of entity, Basically a submit function after filling update form 
    onSubmit() {
        const Post = [{
            propName: this.state.propName,
            value: this.state.newValue
        }]

        fetch("http://localhost:7002/bookings/" + this.state.bookId, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.state.tokenn
            },
            body: JSON.stringify(Post)
        })
            .then((dat) => {
                console.log(dat);
                if (this.state.propName === "amount" || this.state.propName === "status") {
                    return
                }
                else {
                    alert("Data Updated Successfully");
                    this.setState({ bookId: "", propName: "", newValue: "" });
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    //get all booked tickets booked before
    componentWillMount() {
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
                console.log(json);
                this.setState({ bookData: json });
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });


        fetch("http://localhost:7001/flights/")
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {
                console.log("parsed json: ", json);

                this.setState({ data: json });
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });
    }



    getsomething() {
        return (<div></div>);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }







    downloadPDF = (fly) => {
        var flightArrival = "";
        var flightDeparture = "";
        fetch("http://localhost:7001/flights/" + fly.flightID)
            .then(doc => doc.json())
            .then((result) => {
                console.log(result[0].flightArrival);
                console.log(result[0].flightDeparture);
                // flightArrival = ;
                // flightDeparture = ;
                console.log(flightArrival);
                console.log(flightDeparture);

                var doc = new jsPDF('p', 'pt');
                doc.text([
                    `Booking ID: ${fly.bookId}`,
                    `Full Name: ${fly.firstname}  ${fly.lastname}`,
                    `Number: ${fly.number}  Nationality: ${fly.Nationality}`,
                    `Email: ${fly.email}`
                ], 50, 50);

                doc.text([`Flight Arrival Time:  ${result[0].flightArrival}`,
                `Flight Departure Time: ${result[0].flightDeparture}`, "Be On Time ",
                    "Happy Journey"], 50, 170);
                doc.setFont('courier');
                doc.text("Happy Journey from FLy Smart Family", 250, 250);
                doc.save("Ticket.pdf");
            })
    }



    intheEnd() {

        this.setState({ propName: "amount" })
        this.setState({ newValue: 0 })
        this.onSubmit();
    }

    afterinTheEnd() {
        this.setState({ propName: "status" })
        this.setState({ newValue: "CONFIRMED" })
        this.onSubmit();
    }

    loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }


    async displayRazorpay(fly) {

        const __DEV__ = document.domain === 'localhost'

        const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const data = await fetch('http://localhost:7003/pay/razorpay/' + fly.amount, { method: 'POST' })
            .then((t) => t.json())

        console.log(data)

        const options = {
            key: __DEV__ ? 'rzp_test_mTep58pZ2brlaL' : 'PRODUCTION_KEY',
            currency: 'INR',
            amount: fly.amount.toString(),
            order_id: data.id,
            name: 'Donation',
            description: 'Thank you for nothing. Please give us some money',
            // image: 'http://localhost:1337/logo.svg',
            handler: function (response) {
                if (paymentObject.id == 'error') {
                    alert('An Error has Occured ' + paymentObject.er)
                }
                else {

                    alert(`Payment has done sucessfully ${response.razorpay_order_id}`);
                    window.location.reload();
                }
                // alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
            },
            prefill: {
                name: fly.firstname,
                email: 'patil@mail.com',
                phone_number: '9899999999'
            }
        }

        const paymentObject = await new window.Razorpay(options)
        await paymentObject.open();
        this.setState({ bookId: fly.bookId });
        await this.intheEnd();
        await this.afterinTheEnd();

    }

    render() {


        let path = "/flights";
        let isEditModalClose = () => this.setState({ isEdit: false });
        const BookList = this.state.bookData.map((fly) => (


            <tr key={fly._id}>
                <td>{fly.bookId}</td>
                <td> {fly.firstname}  {fly.lastname}</td>
                <td> {fly.flightID}</td>
                <td> {fly.number} </td>
                <td> {fly.Nationality} </td>
                <td> {fly.email}</td>
                <td> {fly.amount}</td>
                <td> {fly.status}</td>
                <td>
                    <ButtonToolbar>
                        <Button
                            variant="outline-primary"
                            onClick={() => { this.setState({ isEdit: true }); this.setState({ bookId: fly.bookId }); }}
                        ><img src={require("../../trash/edit.png")} className="rounded" style={{ height: "3vh", width: "3vh" }} /></Button>

                        <Edit
                            show={this.state.isEdit}
                            onHide={isEditModalClose}
                            tokeen={this.props.match.params.token}
                            bookid={this.state.bookId}
                        />
                    </ButtonToolbar>
                </td>
                <td className="btn" style={{ textAlign: "center", alignContent: "center" }} onClick={() => {
                    fetch("http://localhost:7002/bookings/book/" + fly.bookId, { method: "DELETE" }).then((e) => e.json()).then((rems) => {
                        console.log(rems); alert(`message : ${rems.message}`)
                        window.location.reload();
                    })
                        .catch((err) => { console.log(err); alert(`error occured ${err}`) })
                }}> <img src={require("../../trash/delete.png")} className="rounded" style={{ height: "5vh", width: "5vh" }} /> </td>

                <td>{fly.amount !== 0 ? (<button className="btn btn-outline-primary" onClick={() => {
                    this.displayRazorpay(fly);
                }} > Pay</button>) : <div />}</td>

                <td>{fly.amount === 0 ? (<button className="btn btn-outline-success" onClick={() => {
                    this.downloadPDF(fly);
                }}><img src={require("../../trash/download.png")} className="rounded" style={{ height: "3vh", width: "3vh" }} /></button>) : <div />}</td>


            </tr>



        ));


        const flightList = this.state.data.map((flight) => (
            <tr key={flight._id}>
                <td>{flight.flightId}</td>
                <td>{flight.flightSource}</td>
                <td>{flight.flightDestination}</td>
                <td>{flight.flightArrival}</td>
                <td>{flight.flightDeparture}</td>
                <td>{flight.amount}</td>
                <td></td>
            </tr>
        ));
        let isFormModalClose = () => this.setState({ isForm: false });
        return (
            <div >

                <hr />
                <div className="d-flex justify-content-between" >

                    {/* <button className="btn btn-outline-primary" style={{ margin: "10px 10px" }} onClick={() => {
                         this.setState({ isShow: !this.state.isShow }) 
                         }} >Book New Journey</button> */}
                    <ButtonToolbar>
                        <Button
                            variant="outline-primary"
                            onClick={() => { this.setState({ isForm: true }); }}
                        >New Journey</Button>

                        <NewFlight
                            show={this.state.isForm}
                            onHide={isFormModalClose}
                            tokeen={this.props.match.params.token}
                            bookdata={this.state.bookData}
                        />
                    </ButtonToolbar>
                    <h4 style={{ margin: "10px 10px" }}>Welcome {this.state.bookData[0].firstname}</h4>
                    <button className="btn btn-outline-danger" style={{ margin: "10px 10px" }} onClick={() => { this.setState({ token: "" }); this.props.history.push(path); }} >Logout</button>
                </div>
                <hr />
                <h4 style={{ textJustify: 'auto' }}>Your Bookings</h4>
                <table className="table table-hover container-sm">
                    <thead>
                        <tr>
                            <td>Booking ID</td>
                            <td> Name</td>
                            <td> Flight ID</td>
                            <td> Number </td>
                            <td> Nationality </td>
                            <td> Email</td>
                            <td> Due Amount</td>
                            <td> Status</td>
                            <td>Edit</td>
                            <td>Delete</td>
                            <td>Pay</td>
                            <td>Download</td>
                        </tr>
                    </thead>
                    <tbody>{BookList}</tbody>
                </table>



                {/* ----------------------make search component <div>
                        <div style={{ textAlign: "center" }}>{this.state.isShow ? this.showSearch() : this.getsomething()}</div>
                    </div> */}


                <hr />
                <h5 style={{ textAlign: "center" }}>Available Flights</h5>
                <hr />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td> <button className="btn btn-outline-secondary" style={{ width: "10rem", margin: "10px 10px" }} onClick={() => {
                                this.setState({ data: this.state.data.sort((a, b) => (a.flightId > b.flightId ? 1 : -1)) })
                            }}>flightId</button></td>
                            <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                                const a = this.state.data.sort((a, b) => (a.flightSource > b.flightSource ? 1 : -1));
                                this.setState({ data: a });
                            }}>Flight Source</button></td>
                            <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                                const a = this.state.data.sort((a, b) => (a.flightDestination > b.flightDestination ? 1 : -1));
                                this.setState({ data: a });
                            }}>Flight Destination</button></td>
                            <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                                const a = this.state.data.sort((a, b) => (a.flightArrival > b.flightArrival ? 1 : -1));
                                this.setState({ data: a });
                            }}>Flight Arrival</button></td>
                            <td><button className="btn btn-outline-secondary" style={{ margin: "10px 10px" }} onClick={() => {
                                const a = this.state.data.sort((a, b) => (a.flightDeparture > b.flightDeparture ? 1 : -1));
                                this.setState({ data: a });
                            }}>Flight Departure</button></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>{flightList}</tbody>
                </table>

            </div>
        )
    }
}

export default withRouter(CheckStatus)
