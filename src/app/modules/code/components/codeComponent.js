import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
moment.updateLocale('pl');

export default class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeLink: this.props.match.params.id
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (this.state.codeLink !== nextProps.match.params.id) {
            this.setState({
                codeLink: nextProps.match.params.id
            });
            // this.props.clearCodes();
            this.props.fetchCode(nextProps.match.params.id);
        }
    }

    // componentDidMount() {
    componentWillMount() {
        this.props.fetchCode(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.clearCode();
    }

    getCodeInfo() {
        const { code, isLoading } = this.props;
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
            const checked = code.statusUsed ? 'checked' : '';
            return (
                <div>
                    <p>ID kodu: {code.id}</p>
                    <p>Kod: {code.codeString}</p>
                    <p>Utworzony: {moment(code.createdAt).format('DD MMMM YYYY')}</p>
                    <p>Data wygasnięcia: {moment(code.expirationDate).format('DD MMMM YYYY')}</p>
                    <p>Data użycia: {moment(code.dateUsed).format('DD MMMM YYYY')}</p>
                    <p>Status użycia: <input type="checkbox" value="used" defaultChecked={`${checked}`} /></p>
                    <p>Utworzony użytkownik: {code.userCreated}</p>
                </div>
            );
        }
    }

    render() {
        const { pageView } = this.props;
        // console.log(this.props);
        document.getElementsByTagName("META")[4].content="A tu ciach opis pojedynczego kodu.";
        return (
            <div id={`${pageView}`}>
                <div className='code-header'><div className='container'><h1>Szczegóły kodu:</h1></div></div>
                <div className='container code-container'>
                    {this.getCodeInfo()}
                </div>
            </div>
        );
    }

}