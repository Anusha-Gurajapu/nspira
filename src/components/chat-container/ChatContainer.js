import React from 'react';
import './ChatContainer.css';

class ChatContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  render(){
    return (
      <div className="chat">
        <div className="chatHeader">
          Chat Messages
        </div>
        <div className="body">
          Messages goes here
        </div>
        <div className="footer">
          <div className="newMessage">New Message </div>
          <div className="sendRow">
            <input className="message" type="text" placeholder="Type something..."/>
            <div className="send">
              Send
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatContainer;
