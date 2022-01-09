import axios from 'axios';
import { updateStore } from './index';
import { ACTION_TYPES } from '../reducers/chat';

export const updateChatStore = payload => storeDispatch => {
  storeDispatch(updateStore(ACTION_TYPES, payload));
};

const URL="https://jsonplaceholder.typicode.com";

const ID= 0;

export const getUsers=()=>{
  return new Promise(resolve=>{
    axios.get(`${URL}/users`).then(res=>{
      console.log('getUsers',res);
      if(res.status===200){
        const data = res.data.map(x=>{
          const messages= [
            {message: "Hi", id:x.id},
            {message: "Hello", id:x.id},
            {message: "Hi", id: ID},
            {message: "How are You ?", id:x.id},
            {message: "I am Good", id:ID},
            {message: "What about you ?", id: ID},
            {message: "Fine.", id:x.id},
            {message: "Thanks", id:x.id},
          ]
          return {name:x.name,id:x.id,messages};
        })
        resolve({data,status: true});
      }else{
        resolve({data:[],status: false});
      }
    }).catch(err=>{
      console.error('getUsers',err);
      resolve({data:[],status: false});
    })
  })
}

export const addUser=(params)=>{
  return new Promise(resolve=>{
    axios.post(`${URL}/add/user`,{
      params: {
        name: params.name,
        id: params.id,
      }
    }).then(res=>{
      console.log('addUser',res);
      resolve({status: true});
    }).catch(err=>{
      console.error('addUser',err);
      resolve({status: true})
    })
  })
}

export const sendMessage=params=>{
  return new Promise(resolve=>{
    const postData = {
      message: params.message,
      id: params.id,
    };
    axios.post(`${URL}/${params.userId}/send`,postData).then(res=>{
      console.log('sendMessage',res);
      resolve({status:true});
    }).catch(err=>{
      console.error('sendMessage',err);
      resolve({status: true})
    })
  })
}
