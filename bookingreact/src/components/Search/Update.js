import React, { Component } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'

class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateValue: "Select Value",
            propName: "",
            newValue: "",
            id: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ newValue: e.target.value });
    }

    onUpdateSubmit(e) {
        try {
            e.preventDefault();
            const Post = [{
                propName: this.state.propName,
                value: this.state.newValue
            }]

            fetch("http://localhost:7001/flights/" + this.props.flightid, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + this.props.tokeen
                },
                body: JSON.stringify(Post)
            })
                .then((dat) => {
                    alert("Data Updated Successfully");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert(err);
                })
        }
        catch (err) {
            console.log(err);
            //alert(this.state.flightId);
            alert(err);
        }
    }



    render() {
        // alert(toString(this.props));
        // alert(this.state);
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Flight
        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container" style={{ width: "23rem" }}>
                            <form onSubmit={this.onUpdateSubmit} >
                                <Dropdown >
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "17rem" }}>
                                        {this.state.updateValue}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Source" }); this.setState({ propName: "flightSource" }) }}>Source</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Destination" }); this.setState({ propName: "flightDestination" }) }}>Destination</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Arrival" }); this.setState({ propName: "flightArrival" }) }}>Arrival</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Departure" }); this.setState({ propName: "flightDeparture" }) }}>Departure</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Status" }); this.setState({ propName: "flightStatus" }); }}>Status</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ updateValue: "Amount" }); this.setState({ propName: "amount" }) }}>amount</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <br />
                                <div>

                                    <input
                                        type="text"
                                        name="newValue"
                                        className="form-control"
                                        placeholder="Enter the New Value"
                                        value={this.state.newValue}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-primary">
                                    Update
                            </button>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Update;
