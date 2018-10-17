import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

export default class App extends Component {
  
  input = null
  
  state = {
    html: '',
    fetching: false,
    localUrl: null,
    correctAccount: false,
  }
  
  fetchHTML(url) {
    this.setState({ fetching: true })
    
    return fetch(url)
      .then(resp => resp.text())
      .then(html => this.setState({ html }))
      .then(() => this.setState({ fetching: false }))
  }
  
  /**
   * @see https://reactjs.org/docs/handling-events.html
   **/
  handleInput = event => {
    const  { value } = this.input

    console.log('value', value)
    
    if (value === 'https://www.airbnb.com.au/users/show/99824610') {
      this.setState({ localUrl: 'http://localhost:3000/airbnb.html', correctAccount: true })
      this.fetchHTML(this.state.localUrl)
    }
    
    if (value === 'https://www.ebay.com.au/usr/twiz911') {
      this.setState({ localUrl: 'http://localhost:3000/ebay.html', correctAccount: true })
      this.fetchHTML(this.state.localUrl)
    }
  }
  
  onInputRef = input => {
    this.input = input
  }
  
  render() {
    return (
      <div>
        <div className='inputBox'>
          <input type="text" ref={this.onInputRef} />
          <input type="button" value="Load account" onClick={this.handleInput}/>
        </div>
        <div>
          <iframe src={this.state.localUrl} 
            className='webView'
            title="myPage"/>
        </div>
        { this.state.correctAccount ?
            <div className="confirmAccount">
              <input type="button" value="I confirm this is my account"/>
            </div> : null
        }
      </div>  
    )
  }
}
