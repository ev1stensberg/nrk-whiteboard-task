import {
  REQUEST_DATA, RECEIVE_DATA,
} from '../actionTypes/default';

export const meta = (state = {
  data: [],
}, action) => {
  switch (action.type) {

    case REQUEST_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });

    case RECEIVE_DATA:

      return Object.assign({}, state, {
        data: action.payload,
      });
    default:
      return state;
  }
};
