import React from 'react';
import AddUser from '../add-user';
import './UserContainer.css';

class UserContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAdd: false,
      userName: "",
      users: this.props.users||[],
    };
  }

  toggleAdd = (isAdd) => {
    this.setState({ isAdd });
  }

  handleChangeUserName = ({ text, isAdd }) => {
    const { users, userName } = this.state;
    if (isAdd) {
      this.props.handleAddUser({name: userName, id: new Date().getTime()});
      this.setState({ userName:"", isAdd: false });
    } else{
      this.setState({ userName: text })
    }
  }

  render(){
    return (
      <div className={'user'}>
        {this.props.adding ?<div className={'header'}> Adding User...</div>:
           <div className={'header'}>
            Users
            <img
              src="/images/add.svg"
              alt="Add User"
              onClick={()=>{this.toggleAdd(true)}}
            />
          </div>}
        <div className="userContainer">
          { (this.state.users || []).map((x, ind) =>{
            const isActive = this.props.activeIndex===ind;
            return (
              <div
              className={`userRow`}
              style={{
                    borderLeft: `4px solid ${isActive ? "blue" : "#fff" }`,
                    cursor: isActive ? "default" : "pointer",
                  }}
              role="presentation"
              onClick={()=>{this.props.handleChangeUser(ind)}}
              >
              <img src="/images/user.jpg" alt="profile" />
              <span>{x.name}</span>
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
