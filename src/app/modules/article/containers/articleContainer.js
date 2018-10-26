import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticle, clearArticle } from '../actions/articleAction';
import Article from '../components/articleComponent';

class ArticleContener extends Component {
    render() {
        return (
            <Article {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.articleView.view,
    article: state.articleView.article,
    isLoading: state.articleView.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchArticle: articleView => {
        dispatch(fetchArticle(articleView));
    },
    clearArticle: () => {
        dispatch(clearArticle());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContener);