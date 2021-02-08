import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {

    render() {
        const { messages } = this.props;
        return (
            <div>
                {messages}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages.messageList,
    }
}
export default connect(mapStateToProps, null)(Message);