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
    this.currentAction = ''
    this.potentialActions = []
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

    bot.config.conversation.messages.forEach((msg)=>{
       this.updateState(msg)
    });
  }

  updateState(msg) {
    let randomKey = Math.random().toString(36).substr(2, 5)
    this.chat.push(<h3 key={msg + randomKey}>{msg}</h3>);   
    setTimeout(()=>{this.setState({chat: this.chat})}, 1000)
  }

  startAction(name) {
    this.bot.config.actions.map((action)=>{
      if(action.name === name) {
        action.messages.forEach((msg) =>{
          this.updateState(msg)
        })
        action.choices.forEach((choice) =>{
          this.updateState(choice.message)
          this.potentialActions.push(choice)
        })
      }
    });
  }
  
  askBot(event) {
    if (event.key === 'Enter') {

      let inputVal = event.target.value

      this.updateState(inputVal)

      if(this.currentAction === '' && this.potentialActions.length === 0) {
        this.currentAction = this.bot.config.conversation.startAction;
        this.startAction(this.currentAction)
      } else {
        this.potentialActions.forEach((action) =>{
          if(action.message.toLowerCase().indexOf(inputVal.toLowerCase())) {
            this.currentAction = action.action
            this.potentialActions.splice(0,this.potentialActions.length)
            this.startAction(this.currentAction)
          }
        });
      }

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
