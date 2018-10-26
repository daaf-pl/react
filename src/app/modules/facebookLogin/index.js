import React, { Component } from 'react';

//Assets
// import facebook from './facebook.png'

import config from '../application/config/constants';

class FacebookLogin extends Component{
    
    componentDidMount(){
        // Load the required SDK asynchronously for facebook, google and linkedin
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : config.facebook,
              secret     : config.facebookSecret,
              cookie     : true,  // enable cookies to allow the server to access the session
              xfbml      : true,  // parse social plugins on this page
              version    : 'v2.12' // use version 2.1
            });
        };

        // this.checkLoginState();
    }
    
    facebookLogin = () => {
        /*window.FB.login(
            this.checkLoginState(), 
            { scope : 'email, public_profile' } //Add scope whatever you need about the facebook user
        ); */
        
        window.FB.login(
            function(resp){
                this.statusChangeCallback(resp);
            }.bind(this),{ scope : 'public_profile,email' });
            // }.bind(this),{ scope : 'public_profile,email,user_work_history,user_education_history,user_location' });
    }
    
    checkLoginState() {
        alert("Checking Login Status")
        console.log( "Checking login status..........." );
        
        window.FB.getLoginStatus(function(response) {
            alert("FB Callback")
            console.log("----------->")
            console.log(response)
            this.statusChangeCallback(response);
        }.bind(this));
    }
    
    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            alert( "Połączono z Facebook. Przetwarzanie informacji" );
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }
    
    fetchDataFacebook = () => {
        console.log('Welcome!  Fetching your information.... ');

        // window.FB.api('/me', function(user) {
        //     console.log( user );
        //     console.log('Successful login from facebook : ' + user.name);
        //     alert( 'Successful login for: ' + user.name );
        // });
        window.FB.api('/me', {fields: 'name,email,picture.width(200),first_name,last_name'}, function(response){
            if(!response.error){
                console.log(response);
            } else {
                console.log(response.error);
                alert('Nastąpił błąd]\r\n' + response.error.message);
            }
            
        });
    }

    render(){
        return(
            // <img src={facebook} style={{cursor: 'pointer', width: '40px'}} title="Zaloguj się przy pomocy Facebooka" alt="facebook" onClick={ () => this.facebookLogin() } />
            <button onClick={ () => this.facebookLogin() } type='button' className='btn btn-primary btn-block facebook'>Zaloguj przez facebooka</button>
        )
    }
}

export default FacebookLogin;