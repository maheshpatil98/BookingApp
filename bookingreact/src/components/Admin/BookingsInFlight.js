import React, { Component } from 'react'

class BookingsInFlight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookData: [{}],
        };

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
                console.log("parsed json: ", json);
                console.log(this.state.bookData);
                this.setState({ bookData: json.passengers });
                console.log(this.state.bookData);
            })
            .catch((err) => {
                console.log("fetch request failed: ", err);
            });
    }

    render() {
        const BookList = this.state.bookData.map((fly) => (
            <tr key={fly._id}>
                <td>{fly.flightId}</td>
                <td>{fly.firstname}</td>
                <td>{fly.lastname}</td>
                <td>{fly.number}</td>
                <td>{fly.dob}</td>
                <td>{fly.nationality}</td>
                <td>{fly.status}</td>
                <td></td>
            </tr>
        ));



        return (
            <div>
                <div>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <td>flight.flightId</td>
                                <td>flight.firstname</td>
                                <td>flight.lastname</td>
                                <td>flight.number</td>
                                <td>flight.dob</td>
                                <td>flight.nationality</td>
                                <td>flight.status</td>
                            </tr>
                        </thead>
                        <tbody>{BookList}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default BookingsInFlight
