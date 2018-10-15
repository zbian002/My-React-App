import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  
  input = null
  
  state = {
    html: 'Initial HTML',
    fetching: false,
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
      this.fetchHTML('http://localhost:3000/airbnb.html')
    }
    
    if (value === 'https://www.ebay.com.au/usr/twiz911') {
      this.fetchHTML('http://localhost:3000/ebay.html')
    }
  }
  
  onInputRef = input => {
    this.input = input
  }
  
  render() {
    return (
      <div>
        <div style={styles.search}>
          <input type="text" ref={this.onInputRef} />
          <input type="button" value="Load account" onClick={this.handleInput}/>
        </div>
        <div style={styles.popupContainer}>
          <div 
            style={styles.popup} 
            dangerouslySetInnerHTML={ { __html: this.state.html } }
          >
          </div>
        </div>
      </div>  
    )
  }
}

const styles = {
  popupContainer: {
    position: 'relative',
  },
  popup: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    border: '5px solid #000'
  }
}
