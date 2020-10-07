import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';

class NewFlight extends Component {
    constructor(props) {
        super(props)

        this.state = {
            source: "",
            destination: "",
            flightData: [],
            showlists: false,
            bookData: [],
        }
        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.showflights = this.showflights.bind(this);
        this.bookit = this.bookit.bind(this);
        this.getsomething = this.getsomething.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    bookit(e) {
        console.log(this.props);
        console.log(this.state.bookData);
        const Post = {
            firstname: this.props.bookdata[0].firstname,
            lastname: this.props.bookdata[0].lastname,
            number: this.props.bookdata[0].number,
            Nationality: this.props.bookdata[0].Nationality,
            status: "BOOKED",
            email: this.props.bookdata[0].email,
            password: this.props.bookdata[0].password
        }
        console.log(Post);


        fetch("http://localhost:7002/bookings/book/" + e.flightId + "/" + e.amount + "/" + this.props.bookdata[0].useridentification, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(Post),
        })
            .then((res) => res.json())
            .then((rems) => {
                console.log(rems);
                alert(
                    `Booked succesfully with booking ID ${rems.bookId}`
                );
                window.location.reload();
            });
    }

    componentWillMount() {
        this.setState({ bookData: this.props.bookdata });
    }
    showflights() {

        const flightList = this.state.flightData.map((flight) => (
            <div className="card" style={{ width: "28rem" }} key={flight._id}>
                <div className="card-body" style={{ textAlign: "center", alignContent: "center", alignItems: "center" }} key={flight._id}>
                    <h6 className="card-subtitle mb-2 text-muted">Flight ID: {flight.flightId}</h6>
                    <p className="card-text">Flight Source: {flight.flightSource}</p>
                    <p className="card-text">Flight Destination: {flight.flightDestination}  </p>
                    <p className="card-text">flight Arrival: {flight.flightArrival} Flight Departure: {flight.flightDeparture} </p>


                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const a = prompt("Type confirm to continue booking");
                                a == "CONFIRM" ? this.bookit(flight) : alert("Booking Cancelled")
                            }}
                        >
                            Book
                    </button>
                    </div>
                </div>
            </div >
        ));

        return flightList;

    }


    onSearchSubmit(e) {
        e.preventDefault();
        const src = this.state.source.toLowerCase();
        const dest = this.state.destination.toLowerCase();

        fetch("http://localhost:7001/flights/" + src + "/" + dest)
            .then((response) =>
                response.json().catch((err) => {
                    console.err(`'${err}' happened!`);
                    return {};
                })
            )
            .then((json) => {
                this.setState({ flightData: json });
                this.setState({ showlists: !this.state.showlists });

            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });


    }

    getsomething() {
        return (<div></div>);
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form className="container-sm" style={{ textAlign: "center" }} onSubmit={this.onSearchSubmit} >
                            <div className="card-body " style={{ width: "28rem", alignContent: "center", alignItems: "center" }}>
                                <h5 className="card-title">Search Flight Here</h5>
                                <div>
                                    <label>Source</label>
                                    <input
                                        type="text"
                                        name="source"
                                        placeholder="Source"
                                        value={this.state.source}
                                        className="form form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

                                <div>
                                    <label>Destination :</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        placeholder="Destination"
                                        value={this.state.destination}
                                        className="form form-control"
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary" >
                                    Search
          </button>
                            </div>
                        </form>
                        <h5 style={{ textAlign: "center" }}>Results</h5>
                        {(this.state.showlists) ? this.showflights() : this.getsomething()}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default NewFlight;