import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchArticle, clearArticle } from '../actions/userAction';
import User from '../components/userComponent';

class UserContener extends Component {
    render() {
        return (
            <User {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.userView.view,
    article: state.userView.article,
    isLoading: state.userView.isLoading
})

const mapDispatchToProps = dispatch => ({
    // sendPageView: pageView => {
    //     dispatch(sendPageView(pageView));
    // },
    fetchArticle: articleView => {
        dispatch(fetchArticle(articleView));
    },
    clearArticle: () => {
        dispatch(clearArticle());
    }
})

// export default UserContener;
export default connect(mapStateToProps, mapDispatchToProps)(UserContener);