import React from 'react';
import logo from './logo.svg';
import UserContainer from './components/user-container';
import ChatContainer from './components/chat-container';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return (
      <div className="app">
          <div className="chatContainer">
            <div className="userSpace">
              <UserContainer />
            </div>
            <div className="chatSpace">
              <ChatContainer userId="2" />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
