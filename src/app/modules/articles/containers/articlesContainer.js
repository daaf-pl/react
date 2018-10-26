import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchArticles, clearArticles } from '../actions/articlesAction';
import Articles from '../components/articlesComponent';

class ArticlesContener extends Component {
    render() {
        return (
            <Articles {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.articlesView.view,
    articles: state.articlesView.articles,
    isLoading: state.articlesView.isLoading,
    totalCount : state.articlesView.totalCount,
    limit: state.articlesView.defaultParams.limit,
    userInfo: state.authReducer.userInfo,
})

const mapDispatchToProps = dispatch => ({
    fetchArticles: (page) => {
        dispatch(fetchArticles(page));
    },
    // fetchArticles: articlesView => {
    //     dispatch(fetchArticles(articlesView));
    // },
    clearArticles: () => {
        dispatch(clearArticles());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContener);