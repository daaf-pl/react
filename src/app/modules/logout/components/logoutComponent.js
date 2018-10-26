import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
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
                <Redirect to="/" />
        </div>
      );
    }
  }
}
