import React, { Component } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap';

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updateValue: "Select Property",
            newValue: "",
            propName: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }



    onSubmit() {
        const Post = [{
            propName: this.state.propName,
            value: this.state.newValue
        }]

        fetch("http://localhost:7002/bookings/" + this.props.bookid, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + this.state.tokenn
            },
            body: JSON.stringify(Post)
        })
            .then((dat) => {
                console.log(dat);
                alert("Data Updated Successfully");
                this.setState({ bookId: "" });
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
                        Update Property
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* style={{ width: "28rem" }} */}
                    <div className="container-sm ">
                        <br /><hr />
                        <form style={{ textAlign: "center" }} onSubmit={this.onSubmit} >
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    {this.state.updateValue}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => { this.setState({ updateValue: "First Name" }); this.setState({ propName: "firstname" }); }}>First Name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ updateValue: "Last Name" }); this.setState({ propName: "lastname" }) }}>First Name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ updateValue: "E mail" }); this.setState({ propName: "email" }) }}>E mail</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ updateValue: "Number" }); this.setState({ propName: "number" }) }}>Number</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ updateValue: "Status" }); this.setState({ propName: "status" }) }}>Status</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <br />

                            <div>
                                <label>Enter the New Value</label>
                                <input
                                    type="text"
                                    name="newValue"
                                    className="form-control"
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
        )
    }
}

export default Edit;
