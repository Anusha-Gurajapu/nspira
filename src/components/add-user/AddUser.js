/** @description returns view of add user
 * @version 0.0.1
 * @author Anusha
 */

import React from 'react';
import './AddUser.css';

function AddUser(props) {
  const { userName } = props;
  const canAdd = !!(userName || '').trim()?.length;
  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="heading">Add User</div>
        <div className="row">
          User Name:
          <input
            className="userNameInput"
            type="text"
            defaultValue={''}
            value={userName}
            onChange={e => {
              props.handleChangeUserName({ text: e.target.value });
            }}
          />
        </div>
        <div className="buttonRow">
          <button
            onClick={() => {
              props.toggleAdd(false);
            }}
            className="cancel"
          >
            Cancel
          </button>
          <button
            className="add"
            style={{
              opacity: canAdd ? 1 : 0.5,
              cursor: canAdd ? 'pointer' : 'not-allowed',
            }}
            onClick={() => {
              props.handleChangeUserName({ isAdd: true });
            }}
            disabled={!canAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
