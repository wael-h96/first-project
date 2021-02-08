import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../Extra/PageHeader'
import VacationCard from '../Extra/VacationCard'
import { fetchAllVacations, VACATION_ADDED } from '../../data/vacations/vacationsActions';
import { fetchAllFollowedVacations } from '../../data/vacations/vacationsActions';
import { WebSocketContext } from '../Extra/WebSocket';
import "./style.css"

class CustomerHomePage extends Component {

    async componentDidMount() {
        const { socket } = this.context;
        const userId = this.props.user.id
        await this.props.fetchAllVacations()
        await this.props.fetchAllFollowedVacations(userId)

        socket.on("add-vacation", async () => {
            await this.props.fetchAllVacations()
        })
        socket.on("delete-vacation", async () => {
            await this.props.fetchAllVacations()
            await this.props.fetchAllFollowedVacations(userId)
        })
        socket.on("update-vacation", async () => {
            await this.props.fetchAllVacations()
            await this.props.fetchAllFollowedVacations(userId)
        })

    }

    checkIfFollowed(vacationId) {
        const found = this.props.followedVacationsList.filter(v => v.id === vacationId)
        if (found.length === 0)
            return false
        return true
    }

    render() {
        return (
            <div>
                <PageHeader />

                {/* All The Followed Vacations */}
                <div className="box-shadow followed-vacations-container">
                    <div className="container">
                        <div className="row">
                            <p className="title-message">Your<strong> followed</strong> vacations</p>
                            {(this.props.followedVacationsList.length === 0) ?
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <h5>Oops..You are not following any vacation! GO ahead and FOLLOW vacations!</h5>
                                </div>
                                :
                                this.props.followedVacationsList.map((vacation, index) => (
                                    <VacationCard
                                        key={index}
                                        id={vacation.id}
                                        description={vacation.description}
                                        destination={vacation.destination}
                                        from={vacation.from}
                                        to={vacation.to}
                                        price={vacation.price}
                                        imgUrl={vacation.imageFileName}
                                        numberOfFollowers={vacation.numberOfFollowers}
                                        ifFollowed={true}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* All The Vacations */}
                <div className="box-shadow">
                    <p className="title-message">All<strong> vacations</strong>, Follow now!</p>
                    <div className="container">
                        <div className="row">
                            {this.props.vacationsList.map((vacation, index) => (
                                <VacationCard
                                    key={index}
                                    id={vacation.id}
                                    description={vacation.description}
                                    destination={vacation.destination}
                                    from={vacation.from}
                                    to={vacation.to}
                                    price={vacation.price}
                                    imgUrl={vacation.imageFileName}
                                    numberOfFollowers={vacation.numberOfFollowers}
                                    ifFollowed={false}
                                    ifFollowBtnClicked={this.checkIfFollowed(vacation.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        vacationsList: state.vacations.vacationsList,
        user: state.users.currentUser,
        followedVacationsList: state.vacations.followedVacations,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllVacations: () => dispatch(fetchAllVacations()),
        fetchAllFollowedVacations: (userId) => dispatch(fetchAllFollowedVacations(userId)),
        onAddVacation: (vacation) => dispatch({ type: VACATION_ADDED, vacation }),
    }
}

CustomerHomePage.contextType = WebSocketContext;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHomePage);