import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import Container from './Container';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet title="Schedule ▲ Abstractions"/>
        <div className="App-header">
          <Container>
            <h1 className='App-title'>
              <Link to="/">Schedule</Link>
              {' '}▲{' '}
              <a href="http://abstractions.io">Abstractions</a>
            </h1>
            <a href='https://github.com/chadoh/schedgewool'><img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"/></a>
          </Container>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
