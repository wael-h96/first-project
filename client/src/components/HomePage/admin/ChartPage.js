import React, { Component } from 'react';
import BarChart from '../../Extra/BarChart';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { fetchVacationsFollowedId } from '../../../data/vacations/vacationsActions';
import { WebSocketContext } from '../../Extra/WebSocket';
import "../style.css"

class ChartPage extends Component {

    async componentDidMount() {
        const { socket } = this.context;
        await this.props.fetchVacationsFollowed();
        socket.on("chart-update", async () => {
            await this.props.fetchVacationsFollowed()
        })
    }

    render() {
        return (

            <Modal
                show={this.props.showModal}
                onHide={() => this.props.hide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chart for followed vacations
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="chart-container">
                        <div className="sub chart-wrapper">
                            {this.props.followedVacationsForChart.length === 0 ?
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <p>Oops..., There are no followed vacations!</p>
                                </div> :
                                <BarChart
                                    data={this.props.followedVacationsForChart}
                                    title="Followed Vacations"
                                    color="#3E517A"
                                />
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        followedVacationsForChart: state.vacations.followedVacationsForChart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchVacationsFollowed: () => dispatch(fetchVacationsFollowedId()),
    }
}

ChartPage.contextType = WebSocketContext;

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);