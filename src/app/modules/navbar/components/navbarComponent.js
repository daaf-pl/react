import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
// import LoginLogoutButton from '../../loginLogoutButton/containers/loginLogoutButtonContainer';
import logo from './logo.svg';

export default class Navbar extends Component {

    componentDidMount() {
        // this.props.sendPageView('login');
        // this.props.clearIsLoading();
    }

    renderLogin() {
        const { isAuth } = this.props;
        if (isAuth) {
            return [
                <li key={1} className="nav-item">
                    <NavLink to='/logout' className='nav-link' title='Wyloguj się'>Wyloguj się</NavLink>
                </li>,
            ];
        } else {
            return [
                <li key={1} className="nav-item">
                    <NavLink to='/standard-login' className="nav-link" activeClassName='active' title='Zaloguj się'>Zaloguj się</NavLink>
                </li>,
                <li key={2} className="nav-item">
                    <NavLink to='/zarejestruj-sie' className="nav-link" activeClassName='active' title='Zarejestruj się'>Zarejestruj się <i className='fa fa-sign-in' aria-hidden='true'></i></NavLink>
                </li>,
            ];
        }
    }

    render() {
        return (
            <div className="container-fluid bg-light">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="nav navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Strona główna <span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Różne">Różne</div>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <NavLink className="dropdown-item" activeClassName="active" to="/blog">Artykuły</NavLink>
                                            <NavLink className="dropdown-item" activeClassName="active" to="/change-state">Zmiana State</NavLink>
                                            <NavLink className="dropdown-item" activeClassName="active" title="Chronione" to="/chronione">Chronione</NavLink>
                                            <AuthButton />
                                            <NavLink className="dropdown-item" activeClassName="active" title="O nas" to="/o-nas">O nas</NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" to="/kalendarz">Kalendarz</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" to="/kod">Kody</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" title="Test SMS" to="/sms">SMS</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName="active" title="Test PDF" to="/pdf">pdf</NavLink>
                                    </li>
                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    {this.renderLogin()}
                                    {/* <LoginLogoutButton /> */}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <p>
                Witaj!{" "}
                <button className='btn btn-info'
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >
                    Wyloguj
          </button>
            </p>
        ) : (
                <Link className="dropdown-item" to='/login'>Zaloguj się</Link>
            )
);

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

