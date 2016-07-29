import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.bot = this.initBot(this.getBots()[0])
  }

  componentDidMount() {
    this.startBot(this.bot)
  }

  getBots() {
    return Object.keys(config).filter((bot)=>{
      return bot;
    })
  }

  initBot(name) {
    let bot = {}
    bot.name = name
    bot.config = config[bot.name]
    return bot
  }

  startBot(bot) {
    bot.config.conversation.messages.forEach((message)=>{
      this.setState({messages: message += message});
    });
  }
  
  askBot(event) {
    if (event.key === 'Enter') {
      this.setState({value: event.target.value});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Hi I am {this.bot.name}</h3>
          <h3>{this.state.value}</h3>
        </div>
        <div className="App-intro">
          <div className="answer">
            <p>{this.state.messages}</p>
          </div>

          <div className="question">

            <input
              type="text"
              onKeyPress={this.askBot.bind(this)}
            />

          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
