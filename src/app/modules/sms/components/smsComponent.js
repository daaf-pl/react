import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
moment.updateLocale('pl');

export default class Sms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            smsLink: this.props.match.params.id
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (this.state.smsLink !== nextProps.match.params.id) {
            this.setState({
                smsLink: nextProps.match.params.id
            });
            // this.props.clearCodes();
            this.props.fetchSms(nextProps.match.params.id);
        }
    }

    // componentDidMount() {
    componentWillMount() {
        this.props.fetchSms(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearSms();
    }

    fetchSms() {
        const { sms, isLoading } = this.props;
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
                    <p>ID kodu: {sms.id}</p>
                    <p>Utworzony: {moment(sms.createdAt).format('DD MMMM YYYY')}</p>
                    <p>Nr telefonu: {sms.number}</p>
                </div>
            );
        }
    }

    loadingPage() {
        const { isLoading } = this.props;
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
                    <div className="table-responsive">
                        {this.fetchSms()}
                    </div>
                </div>
            );
        }
    }

    render() {
        document.getElementsByTagName("META")[4].content = "A tu ciach opis pojedynczego kodu.";
        return (
            <div id="sms">
                <div className='sms-header'><div className='container'><h1>Wysyłka SMS:</h1></div></div>
                <div className='container sms-container'>
                    {this.loadingPage()}
                </div>
            </div>
        );
    }

}