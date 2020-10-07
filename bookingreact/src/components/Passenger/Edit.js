import React, { Component } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap';

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            propName: "",
            updateValue: "Select Property",
            newValue: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
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
                        Edit Data
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-sm " style={{ width: "28rem", textAlign: "center", alignSelf: "center", alignContent: "center" }}>

                        <form style={{ textAlign: "center" }} onSubmit={this.onSubmit} >
                            <h5 className="card-title">Edit The Certain Fields</h5>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ width: "28rem" }}>
                                    {this.state.updateValue}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item key="1" onClick={() => { this.setState({ propName: "firstname" }); this.setState({ updateValue: "First Name" }) }}>First Name</Dropdown.Item>
                                    <Dropdown.Item key="2" onClick={() => { this.setState({ propName: "lastname" }); this.setState({ updateValue: "Last Name" }) }}>Last Name</Dropdown.Item>
                                    <Dropdown.Item key="3" onClick={() => { this.setState({ propName: "email" }); this.setState({ updateValue: "E mail" }) }}>E mail</Dropdown.Item>
                                    <Dropdown.Item key="4" onClick={() => { this.setState({ propName: "number" }); this.setState({ updateValue: "Number" }) }}>Number</Dropdown.Item>
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
