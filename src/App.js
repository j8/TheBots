import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        msg: 'hello',
        total: 0
    };
    this.bot = this.setBot(this.getBots()[0])
  }

  componentDidMount() {
  }

  getBots() {
    return Object.keys(config).filter((bot)=>{
      return bot;
    })
  }

  setBot(name) {
    let bot = {}
    bot.name = name
    bot.config = config[bot.name]
    return bot
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Hi I am {this.bot.name}</h3>
        </div>
        <div className="App-intro">
          <div className="answer">
          Hello?
          </div>

          <div className="question">
            <input type="text"/>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
