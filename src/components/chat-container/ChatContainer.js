import React from 'react';
import './ChatContainer.css';

class ChatContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      messages:[
        {text: "Hi", userId: "1"},
        {text: "Hello", userId: "1"},
      ],
    };
    this.messagesEnd = React.createRef();
  }

  componentDidMount(){
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if(this.messagesEnd){
      const scroll = this.messagesEnd.current.scrollHeight - this.messagesEnd.current.clientHeight;
      this.messagesEnd.current.scrollTo(0, scroll);
    }
  }

  handleSend=()=>{
    const {message,messages}= this.state;
    if(!!(message||"").trim()?.length){
      messages.push({text:message, userId:"2"});
      this.setState({messages,message:""},()=>{this.scrollToBottom()});
    }
  }

  handleKeyDownEventOnSearch = e => {
    if (e.which === 13) {
      this.handleSend();
    }
  };

  handleTextInput = e => {
    if (e.which !== 13){
      this.setState({ message: e.target?.value || "" });
    }
  };

  render(){
    const {messages, message}= this.state;
    const canSend = !!(message||"").trim().length;
    return (
      <div className="chat">
        <div className="chatHeader">
          Chat Messages
        </div>
        <div className="body" ref={this.messagesEnd}>
          {(messages||[]).map((x,ind)=>{
            const isMe = this.props.userId === x.userId;
            return(
              <div
               className={`messageContainer`}
               style={{
                 flexDirection: isMe ? 'row-reverse': "row",
                 alignItems: isMe ? 'flex-end' : 'flex-start',
               }}
               key={`chatContainer${x.userId}${ind+1}`}
              >
                 <img src="/images/user-outline.svg" alt={x.userId} />
                 <span className={"chatMessage"}>{x.text}</span>
              </div>
            )
          })}
        </div>
        <div className="footer">
          <div className="newMessage">New Message </div>
          <div className="sendRow">
            <input
              placeholder={'Type a message'}
              value={message}
              className={"message"}
              onChange={this.handleTextInput}
              onKeyDown={this.handleKeyDownEventOnSearch}
            />
            <div
             className="send"
             style={{
               opacity: canSend ? 1 : 0.5,
               cursor: canSend ? "pointer" : "not-allowed",
             }}
             onClick={()=>{if(canSend){this.handleSend()}}}
            >
              Send <img src="/images/send.svg" alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatContainer;
