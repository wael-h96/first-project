import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import * as api from '../../../utils';
import { updateVacation } from '../../../data/vacations/vacationsActions';

class UpdatingVacation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vacation: null,
            file: '',
            vacationImage: '',
        }
        this.description = React.createRef()
        this.price = React.createRef()
        this.destination = React.createRef()
        this.from = React.createRef()
        this.to = React.createRef()

    }

    async componentDidMount() {
        await this.fetchVacation()
        this.description.current.value = this.state.vacation.description
        this.price.current.value = this.state.vacation.price
        this.destination.current.value = this.state.vacation.destination
        this.from.current.value = this.state.vacation.from
        this.to.current.value = this.state.vacation.to

    }

    async fetchVacation() {
        const vacationId = this.props.id
        const serverResponse = await api.get(`/vacations/${vacationId}`);
        this.setState({ vacation: serverResponse.data })
    }

    async handleUpdating(e) {
        e.preventDefault()
        const description = this.description.current.value;
        const destination = this.destination.current.value;
        const from = this.from.current.value;
        const to = this.to.current.value;
        const price = this.price.current.value;

        const vacationToUpdate = {
            id: this.state.vacation.id,
            description,
            destination,
            from,
            to,
            price,
            vacationImage: this.state.file,
        };

        await this.props.handleUpdatingVacation(vacationToUpdate)
        this.props.hide()
    }

    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={() => this.props.hide()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update this vacation plan !!
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form action="/api/vacations/update-vacation" method="POST" onSubmit={(event) => this.handleUpdating(event)}>
                            <div className="form-group">
                                <label className="col-form-label">Destination:</label>
                                <input className="form-control" type="text" ref={this.destination} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Price:</label>
                                <input className="form-control" type="text" ref={this.price} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">From:</label>
                                <input className="form-control" type="date" ref={this.from} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">to:</label>
                                <input className="form-control" type="date" ref={this.to} />
                            </div>
                            <div className="form-group">
                                <input type="file" onChange={(event) => this.setState({ file: event.target.files[0] })} required={true} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Description:</label>
                                <textarea className="form-control" ref={this.description} />
                            </div>
                            <div>
                                <input className="btn btn-success" type="submit" />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleUpdatingVacation: (vacationToUpdate) => dispatch(updateVacation(vacationToUpdate)),
    }
}


export default connect(null, mapDispatchToProps)(UpdatingVacation);