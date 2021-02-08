import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { addVacation } from '../../../data/vacations/vacationsActions';


class AddingVacation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      file: null,
    }
    this.vacationImage = React.createRef()
    this.description = React.createRef()
    this.price = React.createRef()
    this.destination = React.createRef()
    this.from = React.createRef()
    this.to = React.createRef()

  }


  async handleAddingVacation(e) {
    e.preventDefault()
    const description = this.description.current.value;
    const destination = this.destination.current.value;
    const from = this.from.current.value;
    const to = this.to.current.value;
    const price = this.price.current.value;
    const vacationImage = this.state.file;

    const newVacation = {
      description,
      destination,
      from,
      to,
      price,
      vacationImage
    };
    await this.props.handleAddVacation(newVacation)
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
            Add a new vacation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form action="/api/vacations/add" method="POST" onSubmit={(event) => this.handleAddingVacation(event)}>
              <div className="form-group">
                <label className="col-form-label">Destination:</label>
                <input className="form-control" type="text" placeholder="Enter Destination..." required={true} ref={this.destination} />
              </div>
              <div className="form-group">
                <label className="col-form-label">Price:</label>
                <input className="form-control" type="text" placeholder="Enter Price... " ref={this.price} required={true} />
              </div>
              <div className="form-group">
                <label className="col-form-label">From:</label>
                <input className="form-control" type="date" placeholder="From.." ref={this.from} required={true} />
              </div>
              <div className="form-group">
                <label className="col-form-label">to:</label>
                <input className="form-control" type="date" placeholder="To.." ref={this.to} required={true} />
              </div>
              <div className="form-group">
                <input type="file" onChange={(event) => this.setState({ file: event.target.files[0] })} required={true} />
              </div>
              <div className="form-group">
                <label className="col-form-label">Description:</label>
                <textarea className="form-control" placeholder="Enter A description..." ref={this.description} required={true}></textarea>
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
    handleAddVacation: (newVacation) => dispatch(addVacation(newVacation)),
  }
}
export default connect(null, mapDispatchToProps)(AddingVacation);