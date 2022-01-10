import axios from 'axios';
import { updateStore } from './index';
import { ACTION_TYPES } from '../reducers/chat';

/** @description updates the chat store
 * @params payload
 * @return void
 * @author Anusha
 */
export const updateChatStore = payload => dispatch => {
  console.log(dispatch);
  dispatch(updateStore(ACTION_TYPES, payload));
};

const URL = 'https://jsonplaceholder.typicode.com';

const ID = 0;

/** @description gives users list
 * @return {data: usesr list, status: request is success or failure}
 * @author Anusha
 */
export const getUsers = () => {
  return new Promise(resolve => {
    axios
      .get(`${URL}/users`)
      .then(res => {
        console.log('getUsers', res);
        if (res.status === 200) {
          const data = res.data.map(x => {
            const messages = [
              { message: 'Hi', id: x.id },
              { message: 'Hello', id: x.id },
              { message: 'Hi', id: ID },
              { message: 'How are You ?', id: x.id },
              { message: 'I am Good', id: ID },
              { message: 'What about you ?', id: ID },
              { message: 'Fine.', id: x.id },
              { message: 'Thanks', id: x.id },
            ];
            return { name: x.name, id: x.id, messages };
          });
          resolve({ data, status: true });
        } else {
          resolve({ data: [], status: false });
        }
      })
      .catch(err => {
        console.error('getUsers', err);
        resolve({ data: [], status: false });
      });
  });
};

/** @description adds user to users list
 * @params {Object}
 * @return {status: request is success or failure}
 * @author Anusha
 */
export const addUser = params => {
  return new Promise(resolve => {
    axios
      .post(`${URL}/add/user/${params.userId}`, {
        params: {
          name: params.name,
          id: params.id,
        },
      })
      .then(res => {
        console.log('addUser', res);
        resolve({ status: true }); // returning true because the API doesnt exist for working example purpose
      })
      .catch(err => {
        console.error('addUser', err);
        resolve({ status: true }); // returning true because the API doesnt exist for working example purpose
      });
  });
};

/** @description sends message to users
 * @params {Object}
 * @return {status: request is success or failure}
 * @author Anusha
 */
export const sendMessage = params => {
  return new Promise(resolve => {
    const postData = {
      message: params.message,
      id: params.id,
    };
    axios
      .post(`${URL}/${params.userId}/send`, postData)
      .then(res => {
        console.log('sendMessage', res);
        resolve({ status: true }); // returning true because the API doesnt exist for working example purpose
      })
      .catch(err => {
        console.error('sendMessage', err);
        resolve({ status: true }); // returning true because the API doesnt exist for working example purpose
      });
  });
};
