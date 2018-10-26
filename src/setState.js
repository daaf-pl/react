import React, { Component } from 'react';
// import Person from './Person';

export default class setState extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: 'show' };
  }

  componentWillMount() {
    this.setState({ isLoading: 'show' });
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 200);
  }

  render() {
    
    return (
      <Content isLoading={this.state.isLoading} />
    );

  }
}

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({ name: event.currentTarget.value });
  }

  render() {
    if (this.props.isLoading) {
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

          <input type="text" onChange={this.handleChange} />
          <p>Pokaż zmiany: {this.state.name}</p>
        </div>
      );
    }
  }
}
