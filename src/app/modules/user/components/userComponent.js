import React, { Component } from 'react';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleLink: this.props.match.params.id
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (this.state.articleLink !== nextProps.match.params.id) {
            this.setState({
                articleLink: nextProps.match.params.id
            });
            // this.props.clearArticle();
            this.props.fetchArticle(nextProps.match.params.id);
        }
    }

    // componentDidMount() {
    componentWillMount() {
        this.props.fetchArticle(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearArticle();
    }

    getUserInfo() {
        const { article, isLoading } = this.props;
        // console.log(this.props);
        if (isLoading) {
            return (
                <div className='App'>
                    <div className='ReactRoot'>
                        <div>
                            <div>
                                <div className={`PageLoaderView show`}>
                                    <div className='spinner'>
                                        <div className='rect1'></div>
                                        <div className='rect2'></div>
                                        <div className='rect3'></div>
                                        <div className='rect4'></div>
                                        <div className='rect5'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>User id: {article.title}</p>
                    <div className="article-description" dangerouslySetInnerHTML={{ __html: article.longDescription }} />
                </div>
            );
        }
    }

    render() {
        const { pageView } = this.props;
        // console.log(this.props);
        return (
            <div id={`${pageView}`}>
                <div className='news-header'><div className='container'><h1>Artykuły</h1></div></div>
                <div className='container news-container'>
                    {this.getUserInfo()}
                </div>
            </div>
        );
    }

}