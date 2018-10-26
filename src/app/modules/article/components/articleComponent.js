import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
moment.updateLocale('pl');

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleLink: this.props.match.params.id
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.articleLink !== nextProps.match.params.id) {
            this.setState({
                articleLink: nextProps.match.params.id
            });
            this.props.fetchArticle(nextProps.match.params.id);
        }
    }

    componentWillMount() {
        this.props.fetchArticle(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearArticle();
    }

    getArticleInfo() {
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
                    <div className='article-header'>
                        <div className='container'>
                            <h1>{article.title}</h1>
                        </div>
                    </div>
                    <div className='container article-container'>
                        <p>Utworzony: {moment(article.createdAt).format('DD MMMM YYYY')}</p>
                        <div className="article-description" dangerouslySetInnerHTML={{ __html: article.longDescription }} />
                    </div>
                </div>
            );
        }
    }

    render() {
        const { pageView } = this.props;
        // console.log(this.props);
        document.getElementsByTagName("META")[4].content = "A tu ciach opis pojedynczego kodu.";
        return (
            <div id={`${pageView}`}>

                {this.getArticleInfo()}
            </div>
        );
    }

}