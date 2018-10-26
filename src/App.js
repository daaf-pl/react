import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  // NavLink,
  Redirect,
  // withRouter
} from 'react-router-dom';
import './App.css';

import { findRouteName } from './findRouteName'
import Home from './Home';
import About from './About';
import setState from './setState';
import Articles from './app/modules/articles/containers/articlesContainer';
import ArticlePage from './app/modules/article/containers/articleContainer';
import SmsListPage from './app/modules/sms/containers/smsListContainer';
import SmsPage from './app/modules/sms/containers/smsContainer';
import PdfPage from './app/modules/pdf/containers/pdfContainer';
import UserPage from './app/modules/user/containers/userContainer';
import CodesPage from './app/modules/codes/containers/codesContainer';
import CodePage from './app/modules/code/containers/codeContainer';
// import FullCalendar from './app/modules/fullCalendar/containers/fullCalendarContainer';
import indexCalendar from './app/modules/fullCalendar/containers/indexCalendarContainer';
import StandardLogin from './app/modules/login/containers/loginContainer';

// import Logout from './app/modules/logout/components/logoutComponent';
import Logout from './app/modules/logout/containers/logoutContainer';
import Navbar from './app/modules/navbar/containers/navbarContainer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="main">
          <Navbar />
          <div className="container mt-3 mb-3">
            <Route path='/:path' component={Breadcrumbs} />
          </div>
          <div className="container mt-3 mb-3">
            <Route exact path="/" component={Home} />
            <Route exact path="/o-nas" component={About} />
            {/* <Route path="/kalendarz" component={FullCalendar} /> */}
            <Route exact path="/kalendarz" component={indexCalendar} />
            <Route exact path="/change-state" component={setState} />
            <Route exact path="/blog" component={Articles} />
            <Route exact path='/blog/strona/:page' component={Articles} />
            <Route exact path="/artykul/:id" component={ArticlePage} />
            <Route exact path="/sms" component={SmsListPage} />
            <Route exact path="/sms/:id" component={SmsPage} />
            <Route exact path="/pdf" component={PdfPage} />
            <Route exact path="/user/:id" component={UserPage} />
            <Route exact path="/kod/" component={CodesPage} />
            <Route exact path="/kod/:id" component={CodePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/standard-login" component={StandardLogin} />
            <Route exact path='/logout' component={Logout} />
            <PrivateRoute exact path="/chronione" component={Protected} />
          </div>
          <footer className="footer">
            <div className="container">
              <span className="text-muted">Stopka.</span>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

const BreadcrumbsItem = ({ ...rest, match }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact
        ? <span className='breadcrumb-item active'>{routeName}</span>
        : <Link className='breadcrumb-item' to={match.url || ''}>{routeName}</Link>
    )
  }
  return null
}

const Breadcrumbs = ({ ...rest, location: { pathname }, match }) => {
  const paths = []
  pathname.split('/').reduce((prev, curr, index) => {
    paths[index] = `${prev}/${curr}`
    return paths[index]
  })
  return (
    <nav className='breadcrumb'>
      <Link className="breadcrumb-item" to="/">Strona główna</Link>
      {paths.map((p, i) => <Route path={p} key={i} component={BreadcrumbsItem} />)}
    </nav>
  )
}

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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

const Protected = () => <h3>Protected</h3>;

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>Musisz być zalogowany, by obejrzeć zawartość tej strony {from.pathname}</p>
        <button onClick={this.login} className='btn btn-info'>Zaloguj</button>
      </div>
    );
  }
}
