import React from 'react';
import AddUser from '../add-user';
import './UserContainer.css';

class UserContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeUser: null,
      isAdd: false,
      userName: "",
      users: ["1","2","3","4","5","6","7","8","9","10","11","12"],
    };
  }

  toggleAdd = (isAdd) => {
    this.setState({ isAdd });
  }

  handleChangeUserName = ({ text, isAdd }) => {
    const { users, userName } = this.state;
    if (isAdd) {
      users.push(userName);
      this.setState({ users, userName:"", isAdd: false });
    } else{
      this.setState({ userName: text })
    }
  }

  render(){
    return (
      <div className={'user'}>
        <div className={'header'}>
          Users
          <img
            src="/images/add.svg"
            alt="Add User"
            onClick={()=>{this.toggleAdd(true)}}
          />
        </div>
        <div className="userContainer">
          { (this.state.users || []).map((x, ind) =>{
            const isActive = this.state.activeUser===ind;
            return (
              <div
              className={`userRow`}
              style={{
                    borderLeft: `4px solid ${isActive ? "blue" : "#fff" }`,
                    cursor: isActive ? "default" : "pointer",
                  }}
              role="presentation"
              onClick={()=>{this.setState({activeUser:ind})}}
              >
              <img src="/images/user.jpg" alt="profile" />
              <span>{x}</span>
              </div>
            )}
          )}
        </div>
        {this.state.isAdd ?
          <AddUser 
            toggleAdd={this.toggleAdd}
            userName={this.state.userName}
            handleChangeUserName={this.handleChangeUserName}
          />
          : null
        }
      </div>
    )
  }
}

export default UserContainer;
