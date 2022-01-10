/** @description returns view of chat panel
 * @version 0.0.1
 * @author Anusha
 */

import React from 'react';
import './ChatContainer.css';

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data?.messages?.length !== this.props.data?.messages?.length ||
      prevProps.sending === true
    ) {
      this.scrollToBottom();
    }
  }

  /** @description to scroll to the bottom
   * @author Anusha
   */
  scrollToBottom = () => {
    if (this.messagesEnd) {
      const scroll =
        this.messagesEnd.current.scrollHeight -
        this.messagesEnd.current.clientHeight;
      this.messagesEnd.current.scrollTo(0, scroll);
    }
  };

  /** @description sends messages to users
   * @author Anusha
   */
  handleSend = () => {
    const { data } = this.props;
    const { message } = this.state;
    if ((message || '').trim()?.length) {
      this.props.handleSendMessage({ message, id: 0, userId: data.id });
      this.setState({ message: '' });
    }
  };

  /** @description sends message on press of enter key
   * @author Anusha
   */
  handleKeyDownEventOnSearch = e => {
    if (e.which === 13) {
      this.handleSend();
    }
  };

  /** @description updates message data in state on text change
   * @author Anusha
   */
  handleTextInput = e => {
    if (e.which !== 13) {
      this.setState({ message: e.target?.value || '' });
    }
  };

  render() {
    const { message } = this.state;
    const { sending, data } = this.props;
    const canSend = !!(message || '').trim().length && !sending;
    return (
      <div className="chat">
        <div className="chatHeader">Chat Messages</div>
        <div className="body" ref={this.messagesEnd}>
          {(data?.messages || []).map((x, ind) => {
            const isMe = x.id === 0;
            return (
              <div
                className={`messageContainer`}
                style={{
                  flexDirection: isMe ? 'row-reverse' : 'row',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
                key={`chatContainer${x.userId}${ind + 1}`}
              >
                <img src="/images/user-outline.svg" alt={x.name} />
                <span className={'chatMessage'}>{x.message}</span>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="newMessage">New Message </div>
          <div className="sendRow">
            <input
              placeholder={`${
                sending ? 'Sending Message, please wait...' : 'Type a message'
              }`}
              value={message}
              className={'message'}
              onChange={this.handleTextInput}
              onKeyDown={this.handleKeyDownEventOnSearch}
            />
            <div
              className="send"
              style={{
                opacity: canSend ? 1 : 0.5,
                cursor: canSend ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (canSend) {
                  this.handleSend();
                }
              }}
              role="presentation"
            >
              Send{sending ? 'ing' : ''} <img src="/images/send.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatContainer;
