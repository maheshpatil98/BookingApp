import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';

class PayDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.setState({ data: this.props.data });
    }

    render() {

        const payList = this.props.data.map((flight) => (
            <tr key={flight._id}>
                <td>{flight.id}</td>
                <td>{flight.amount}</td>
                <td>{flight.receipt}</td>
                <td></td>
            </tr>
        ));

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
                    <table className="table table-hover">
                        <thead>
                            <tr><td>Transaction ID</td>
                                <td>Transaction Amount</td>
                                <td>Trasaction Reciept</td></tr>
                        </thead>
                        <tbody>
                            {payList}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>






        )
    }
}

export default PayDetails
