const updateStore = (actionTypes, payload) => dispatch => {
  dispatch({ type: actionTypes.updateStore, payload });
};

export { updateStore };
