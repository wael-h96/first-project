import React, { Component } from 'react';
import VacationCard from '../../Extra/VacationCard';
import { connect } from 'react-redux';
import { fetchAllVacations } from '../../../data/vacations/vacationsActions'
import PageHeader from '../../Extra/PageHeader'
import { deleteVacation } from '../../../data/vacations/vacationsActions'
import AddingVacation from './AddingVacation';
import UpdatingVacation from './UpdatingVacation';
import ChartPage from './ChartPage';
import WebSocket, { WebSocketContext } from '../../Extra/WebSocket';
import "../style.css"

class AdminHomePage extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false,
            showChartModal: false,
            showUpdatingModal: false,
            updatingId: null,
        }
    }

    async componentDidMount() {
        await this.props.fetchAllVacations();
    }

    async handleDeleting(vacationId) {
        await this.props.onDelete(vacationId)
    }

    handleUpdating(vacationId) {
        this.setState({ showUpdatingModal: true, updatingId: vacationId })
    }

    render() {
        return (

            <div>
                <PageHeader />
                <p className="title-message">Since you're an <strong>admin</strong> so you can
                    <button className="btn btn-primary admin-addv-button"
                        onClick={() => this.setState({ showModal: true })} >Add Vacation
                    </button>
                    <button className="btn btn-success"
                        onClick={() => this.setState({ showChartModal: true })}>
                        Show Chart
                    </button></p>
                <br />

                {/* This one is for showing the adding vacation model */}
                {
                    this.state.showModal &&
                    <AddingVacation
                        showModal={this.state.showModal}
                        hide={() => this.setState({ showModal: false })}
                    />
                }


                {/* This one is for showing the chart model */}
                {this.state.showChartModal &&
                    <WebSocketContext.Provider value={new WebSocket()}>
                        <ChartPage
                            showModal={this.state.showChartModal}
                            hide={() => this.setState({ showChartModal: false })}
                        />
                    </WebSocketContext.Provider>
                }

                {/* This one is for showing the updating vacation model */}
                {this.state.showUpdatingModal &&
                    <UpdatingVacation
                        id={this.state.updatingId}
                        showModal={this.state.showUpdatingModal}
                        hide={() => this.setState({ showUpdatingModal: false })}
                    />
                }


                {/* This one renders the vacations */}
                <div className="container">
                    <div className="row">
                        {!this.state.showModal && !this.state.showChartModal
                            && !this.state.showUpdatingModal && (
                                this.props.vacationsList.length === 0 ?
                                    <div><h2>There are no vacations for our customers ! GO ahead and do your <strong>JOB</strong></h2></div> :
                                    this.props.vacationsList.map((vacation, index) => (
                                        <VacationCard
                                            id={vacation.id}
                                            key={index}
                                            description={vacation.description}
                                            destination={vacation.destination}
                                            from={vacation.from}
                                            to={vacation.to}
                                            price={vacation.price}
                                            imgUrl={vacation.imageFileName}
                                            onDeletingVacation={(vacationId) => this.handleDeleting(vacationId)}
                                            onUpdatingVacation={(vacationId) => this.handleUpdating(vacationId)}
                                        />
                                    ))
                            )
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        vacationsList: state.vacations.vacationsList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllVacations: () => dispatch(fetchAllVacations()),
        onDelete: (vacationId) => dispatch(deleteVacation(vacationId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHomePage);