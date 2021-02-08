import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import { connect } from 'react-redux';
import { followVacation } from '../../data/vacations/vacationsActions';
import { unfollowVacation } from '../../data/vacations/vacationsActions';
import DoneIcon from '@material-ui/icons/CheckCircleRounded';
import "./style.css"

class VacationCard extends Component {

    handleFollowOrUnfollowVacation() {
        if (this.props.ifFollowed) {
            this.handleUnfollowVacation()
        }
        else {
            this.handleFollowVacation()
        }
    }

    async handleFollowVacation() {
        const { user } = this.props
        const userFollowVacation = {
            userId: user.id,
            vacationId: this.props.id
        }
        await this.props.onFollowVacation(userFollowVacation)

    }

    async handleUnfollowVacation() {
        const { user } = this.props
        const userUnfollowVacation = {
            userId: user.id,
            vacationId: this.props.id
        }
        await this.props.onUnfollowVacation(userUnfollowVacation)
    }

    render() {
        let { role } = this.props;
        return (
            < div className="card bg-dark col-md-3 text-center" >
                <br />
                <div>
                    {role === "admin" ?
                        <div>
                            <Button variant="contained" onClick={() => this.props.onUpdatingVacation(this.props.id)}>
                                <EditOutlinedIcon className="edit-icon" />
                            </Button>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Button variant="contained" onClick={() => this.props.onDeletingVacation(this.props.id)}>
                                <DeleteIcon className="delete-icon" />
                            </Button>
                        </div> :
                        <div>
                            {(!this.props.ifFollowed && this.props.ifFollowBtnClicked) ?
                                <p className="box-shadow vacationcard-p">
                                    Already Followed<DoneIcon /></p>
                                :
                                <Button variant="contained"
                                    onClick={() => this.handleFollowOrUnfollowVacation()}>
                                    {this.props.ifFollowed ? "Unfollow" : "Follow"}
                                &nbsp;<ThumbsUpDownIcon />
                                </Button>
                            }

                        </div>
                    }

                </div>
                <br />
                <img className="card-img-top img-fluid" src={"/" + this.props.imgUrl} alt="aa" max-width="200" max-height="200" />
                <div className="card-body text-center">
                    <h4 className="card-title">{this.props.destination}</h4>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-subtitle mb-2 text-muted">From: {this.props.from} <br /> to: {this.props.to}</p>
                    <div>
                        <p>Price: {this.props.price} <strong>$</strong></p>
                    </div>
                    {!(role === "admin") &&
                        <div className="followers-div">
                            <p>{this.props.numberOfFollowers} Followers</p>
                        </div>
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.users.role,
        user: state.users.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFollowVacation: (userFollowVacation) => dispatch(followVacation(userFollowVacation)),
        onUnfollowVacation: (userUnfollowVacation) => dispatch(unfollowVacation(userUnfollowVacation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VacationCard);