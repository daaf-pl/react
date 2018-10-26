import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pl';
moment.updateLocale('pl');
// console.log(moment.locale());

export default class Code extends Component {

    constructor(props) {
        super(props);
        this.fetchAllCodes = this.fetchAllCodes.bind(this);
    }

    // componentDidMount() {
    componentWillMount() {
        this.props.fetchCodes(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCodes();
    }

    fetchAllCodes() {
        const { codes } = this.props;
        if (codes && codes.length > 0) {
            let currentCode = null;
            currentCode = codes.map((code, index) =>
                <li key={index} className='code-container'><Link to={`/kod/${code.id}`}>{code.id}</Link> - utworzono: {moment(code.createdAt).format('DD MMMM YYYY')}</li>
            );
            return currentCode;
        }
    }

    getCodeInfo() {
        const { isLoading } = this.props;
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
                    <ul>
                        {this.fetchAllCodes()}
                    </ul>
                </div>
            );
        }
    }

    render() {
        const { pageView } = this.props;
        // console.log(this.props);
        document.getElementsByTagName("META")[4].content = "A tu ciach opis kodów.";
        return (
            <div id={`${pageView}`}>
                <div className='code-header'><div className='container'><h1>Kody</h1></div></div>
                <div className='container code-container'>
                    {this.getCodeInfo()}
                </div>
            </div>
        );
    }

}