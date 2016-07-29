import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.chat = []
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

    bot.config.conversation.messages.forEach((msg, i)=>{
       this.updateState(msg)
    });

    this.startAction(bot.config.conversation.startAction)
  }

  updateState(msg) {
    this.chat.push(<h3 key={msg}>{msg}</h3>);   
    this.setState({chat: this.chat})
  }

  startAction(action) {

  }
  
  askBot(event) {
    if (event.key === 'Enter') {
      this.updateState(event.target.value)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Hi I am {this.bot.name}</h3>
        </div>
        <div className="App-intro">
          <div className="chat">
            {this.state.chat}
          </div>

          <div className="question">

            <input
              type="text"
              value={this.textValue}
              onKeyPress={this.askBot.bind(this)}
            />

          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
