import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import DeleteModal from './deleteModalComponent';
import moment from 'moment';
import 'moment/locale/pl';
moment.updateLocale('pl');

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleLink: this.props.match.params.id,
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(event) {
        console.log('here: ' + event);
        this.setState({ showModal: true, initialValues: event });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
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

    componentDidMount() {
        let page = this.props.match.params.page ? this.props.match.params.page : '0';
        this.props.fetchArticles(page);
    }

    getComponent(index) {
        // console.log(index.i);
        this.props.fetchArticles(index.i);
    }

    getPagination() {
        const { totalCount, limit } = this.props;

        const pages = Math.ceil(totalCount / limit);
        if (pages > 1) {

            let indents = [];
            for (let i = 1; i <= pages; i++) {
                indents.push(<li key={i} className={this.checkActiveSite(i)} onClick={this.getComponent.bind(this, { i })}><NavLink to={`/blog/strona/${i}`} className="page-link" title={`przejdź do strony ${i}`}>{i}</NavLink></li>);
                // indents.push(<li key={i} className={isActive ? 'page-item active' : 'page-item'} onClick={this.getComponent.bind(this, { i })}><NavLink to={`/blog/strona/${i}`} className="page-link" title={`przejdź do strony ${i}`}>{i}</NavLink></li>);
            }

            return (
                <nav aria-label="">
                    <ul className='pagination'>
                        {indents}
                    </ul>
                </nav>
            );
        }
    }

    checkActiveSite(i) {
        if (!this.props.match.params.page && i === 1) {
            return 'page-item active';
        } else if (Number(this.props.match.params.page) && Number(this.props.match.params.page) === i) {
            return 'page-item active';
        } else {
            return 'page-item';
        }
    }

    componentWillUnmount() {
        this.props.clearArticles();
    }

    getArticles() {
        const { articles, isLoading, userInfo } = this.props;
        let currentArticle = null;

        if (isLoading) {
            currentArticle = <div className='App'>
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
            </div>;
        } else {
            if (articles && articles.length > 0) {
                // console.log(userInfo);
                if (userInfo && userInfo.role === '1') {
                    currentArticle = articles.map((number, index) =>
                        <div key={index} className='row'>
                            <div className='col-md-2'>
                                <div className='brown-rounded-square'>
                                    {moment(number.createdAt).format('DD MMMM YYYY')}
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h3>{number.title}</h3>
                                <div className='short-news-description'>
                                    <p>{number.shortDescription}</p>
                                </div>
                                <div className='more-link-container'>
                                    <NavLink to={`/artykul/${number.friendlyUrl}`}>czytaj...</NavLink>
                                </div>
                                <div className='separator-line'></div>
                            </div>
                            <div className='col-md-2'>
                                <NavLink to={`/artykul/${number.friendlyUrl}`}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edytuj</NavLink><br />
                                <button onClick={() => this.handleOpenModal(number.id)}><i className="fa fa-trash-o" aria-hidden="true"></i> Usuń</button>
                            </div>
                        </div>
                    );
                } else {
                    currentArticle = articles.map((number, index) =>
                        <div key={index} className='row'>
                            <div className='col-md-3'>
                                <div className='brown-rounded-square'>
                                    {moment(number.createdAt).format('DD MMMM YYYY')}
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <h3>{number.title}</h3>
                                <div className='short-news-description'>
                                    <p>{number.shortDescription}</p>
                                </div>
                                <div className='more-link-container'>
                                    <NavLink to={`/artykul/${number.friendlyUrl}`}>czytaj...</NavLink>
                                </div>
                                <div className='separator-line'></div>
                            </div>
                        </div>
                    );
                }
            }
        }

        return currentArticle;
    }

    render() {
        const { pageView } = this.props;
        const modal = !_.isEmpty(this.props.initialValues) ? <DeleteModal {...this.props} isOpen={this.state.showModal} clearModal={this.handleCloseModal} /> : null;
        return (
            <div id={`${pageView}`}>
                <div className='news-header'><div className='container'><h1>Artykuły</h1></div></div>
                <div className='container news-container'>
                    {this.getArticles()}
                </div>
                <div className='container pagination'>
                    <div className='col-md-12'>
                        <div className='row text-right pagination-block'>
                            <div className='col-md-12'>
                                {this.getPagination()}
                            </div>
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }

}