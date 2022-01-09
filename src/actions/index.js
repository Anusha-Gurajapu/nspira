const updateObjectOfRetakeStore = (key, value) => dispatch => {
  dispatch({
    type: 'updateObjectOfRetakeStore',
    payload: { key, value },
  });
};

const updateRetakeStore = (key, value) => dispatch => {
  if (typeof key === 'object' && key.length) {
    dispatch({
      type: 'updateMultipleValuesOfRetakeStore',
      payload: { params: key },
    });
  } else if (key) {
    dispatch({
      type: 'updateRetakeStore',
      payload: { key, value },
    });
  }
};

const updateStore = (actionTypes, payload) => dispatch => {
  dispatch({ type: actionTypes.updateStore, payload });
};

export { updateStore, updateRetakeStore, updateObjectOfRetakeStore };
