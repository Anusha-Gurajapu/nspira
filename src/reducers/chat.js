import produce from 'immer';

export const DEFAULT_STORE = {
  users: [],
};

export const ACTION_TYPES = {
  updateStore: 'updateChatStore',
};

export default function chat(state = DEFAULT_STORE, action) {
  switch (action.type) {
    case ACTION_TYPES.updateStore: {
      const newState = produce(state, draftState => {
        const keysToUpdate = Object.keys(action.payload);
        keysToUpdate.forEach(key => {
          draftState[key] = action.payload[key];
        });
      });
      return newState;
    }
    default:
      return state;
  }
}
