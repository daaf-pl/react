import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

export default class LoginLogoutButton extends Component {

    // componentDidMount() {
    //   const { /*getUserInfo,*/ checkIsAuth, userId } = this.props;
    //   // checkIsAuth();
    //   // getUserInfo(userId);
    // }

    renderProfileLink(userInfo) {
        const profileLink = _.get(userInfo, 'role.name', '');
        let linkToProfile;
        if (profileLink === 'user') { linkToProfile = '/profil'; }
        if (profileLink === 'groomer') { linkToProfile = '/groomer/' + userInfo.friendlyUrl; }
        return linkToProfile;
    }

    renderLinks() {
        if (this.props.isAuth) {
            //   const { userInfo } = this.props;
            // console.log(userInfo);
            //   const avatarImage = _.get(userInfo, 'groomerMoreInfo.avatar') ? (<img src={`${_.get(userInfo, 'groomerMoreInfo.avatar')}`} alt='' className='headerAvatar' />) : (<img src='/img/header-avatar.png' alt='' />);
            // return (
            return [
                <li key={1}>
                    <NavLink to='/logout' className='header-profile-link' title='Wyloguj się'>Wyloguj się</NavLink>
                </li>,
            ];
            // <li className='second-li'>
            //   <div className='row header-logged-box'>
            //     <div className='col-md-4 text-center'>
            //       <NavLink to={this.renderProfileLink(userInfo)} title='Przejdź do profilu'>{avatarImage}</NavLink>
            //     </div>
            //     <div className='col-md-8'>
            //       <NavLink to={this.renderProfileLink(userInfo)} title='Przejdź do profilu'>{userInfo.nameSurrname}</NavLink><br />
            //       <NavLink to={this.renderProfileLink(userInfo)} className='header-profile-link' title='Przejdź do profilu'>Edytuj</NavLink> | <NavLink to='/logout' className='header-profile-link' title='Wyloguj się'>Wyloguj się</NavLink>
            //     </div>
            //   </div>
            // </li>
            //   );
        } else { // nie zalogowany
            return [
                <li key={1}>
                    <NavLink to='/login' activeClassName='active' title='Zaloguj się'>Zaloguj się</NavLink>
                </li>,
                <li key={2}>
                    <NavLink to='/zarejestruj-sie' activeClassName='active' title='Zarejestruj się'>Zarejestruj się <i className='fa fa-sign-in' aria-hidden='true'></i></NavLink>
                </li>,
                <li key={3}>
                    <NavLink to='/logout' className='header-profile-link' title='Wyloguj się'>Wyloguj się</NavLink>
                </li>,
            ];
        }
    }

    render() {
        return (
            <div>
                {this.renderLinks()}
            </div>
        );
    }
}