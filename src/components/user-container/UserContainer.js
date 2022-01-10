/** @description returns view of users panel
 * @version 0.0.1
 * @author Anusha
 */

import React from 'react';
import AddUser from '../add-user';
import './UserContainer.css';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
      userName: '',
    };
  }

  /** @description toggles add model
   * @author Anusha
   */
  toggleAdd = isAdd => {
    this.setState({ isAdd });
  };

  /** @description handles change of username
   * @author Anusha
   */
  handleChangeUserName = ({ text, isAdd }) => {
    const { userName } = this.state;
    if (isAdd) {
      this.props.handleAddUser({ name: userName, id: new Date().getTime() });
      this.setState({ userName: '', isAdd: false });
    } else {
      this.setState({ userName: text });
    }
  };

  render() {
    return (
      <div className={'user'}>
        {this.props.adding ? (
          <div className={'header'}> Adding User...</div>
        ) : (
          <div className={'header'}>
            Users
            <img
              src="/images/add.svg"
              alt="Add User"
              onClick={() => {
                this.toggleAdd(true);
              }}
              role="presentation"
            />
          </div>
        )}
        <div className="userContainer">
          {(this.props.users || []).map((x, ind) => {
            const isActive = this.props.activeIndex === ind;
            return (
              <div
                className={`userRow`}
                style={{
                  borderLeft: `4px solid ${isActive ? 'blue' : '#fff'}`,
                  cursor: isActive ? 'default' : 'pointer',
                }}
                role="presentation"
                onClick={() => {
                  this.props.handleChangeUser(ind);
                }}
                key={`userContainer${x.id}`}
                title={x.name}
              >
                <img src="/images/user.jpg" alt="profile" />
                <span>{x.name}</span>
              </div>
            );
          })}
        </div>
        {this.state.isAdd ? (
          <AddUser
            toggleAdd={this.toggleAdd}
            userName={this.state.userName}
            handleChangeUserName={this.handleChangeUserName}
          />
        ) : null}
      </div>
    );
  }
}

export default UserContainer;
