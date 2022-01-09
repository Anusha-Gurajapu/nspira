import React from 'react';
import logo from './logo.svg';
import UserContainer from './components/user-container';
import ChatContainer from './components/chat-container';
import {getUsers, addUser, sendMessage} from './actions/chat';
import { connect } from 'react-redux';
import store from './store/configureStore';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loading: true,
      users:[],
      activeIndex: 0,
    };
  }

  componentDidMount(){
    this.fetchRequiredData();
  }

  fetchRequiredData=async()=>{
    const data = await getUsers();
    this.setState({loading: false,users:data.data||[]})
  }

  handleAddUser=async (params)=>{
    const {users}=this.state;
    this.setState({adding: true});
    const data = await addUser(params);
    params.messages = [];
    users.push(params);
    this.setState({users, adding: false});
  }

  handleSendMessage=async (params)=>{
    const {users,activeIndex} = this.state;
    this.setState({sending: true});
    const data = await sendMessage(params);
    users[activeIndex].messages.push({message:params.message,id:params.id});
    this.setState({users, sending: false});
  }

  handleChangeUser=ind=>{
    this.setState({activeIndex:ind});
  }

  render(){
    const {users,loading,activeIndex,sending,adding}=this.state;
    return (
        <div className="app">
            {loading ?
              <div className="chatContainer">
                loading...
              </div>
            :<div className="chatContainer">
              <div className="userSpace">
                <UserContainer
                  users={users||[]}
                  handleAddUser={this.handleAddUser}
                  activeIndex={activeIndex}
                  handleChangeUser={this.handleChangeUser}
                  adding={adding}
                />
              </div>
              <div className="chatSpace">
                <ChatContainer
                  data={users?.[activeIndex]||{}}
                  handleSendMessage={this.handleSendMessage}
                  sending={sending}
                />
              </div>
            </div>}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.chat.users,
})

const mapDispatchToProps = {
  // getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
