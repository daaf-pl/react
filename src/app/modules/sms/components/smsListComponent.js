import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/pl';
moment.updateLocale('pl');

export default class SmsList extends Component {

    componentDidMount() {
        this.props.fetchSmsList('1234567');
    }

    componentWillUnmount() {
        this.props.clearSms();
    }

    fetchSmsList() {
        const { smsList } = this.props;
        if (smsList && smsList.length > 0) {
            let currentSms = null;
            currentSms = smsList.map((smsList, index) =>
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{_.get(smsList, 'number', '')}</td>
                    <td>{_.get(smsList, 'type', 'Brak typu')}</td>
                    <td>{moment(smsList.createdAt).format('DD MMMM YYYY HH:MM')}</td>
                    <td><Link to={`/sms/${smsList.id}`}><i className="fa fa-eye" aria-hidden="true"></i></Link></td>
                </tr>
                // <li key={index} className='code-container'><Link to={`/sms/${sms.id}`}>{sms.id}</Link> - utworzono: </li>
            );
            return currentSms;
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
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nr telefonu</th>
                                    <th scope="col">Typ</th>
                                    <th scope="col">Data wysłania</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.fetchSmsList()}
                            </tbody>
                        </table>
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