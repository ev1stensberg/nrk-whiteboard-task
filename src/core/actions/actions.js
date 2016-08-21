import {
 REQUEST_DATA, RECEIVE_DATA,
} from '../actionTypes/default';
import JSONstat from 'jsonstat';
import fetch from 'isomorphic-fetch';

function requestData(data) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_DATA,
      payload: data,
    });
  };
}

function receiveData(data, json) {
  const ds = json.Dataset(0);
  const table = JSONstat(ds).Dataset(0).toTable({ type: 'arrobj' });
  return (dispatch) => {
    dispatch({
      type: RECEIVE_DATA,
      payload: table,
    });
  };
}

export function fetchDataFromSSB(data) {
  const id = '1102';

  return dispatch => {
    dispatch(requestData(data));
    return fetch(`http://data.ssb.no/api/v0/dataset/${id}.json?lang=no`)

      .then(response => response.json())
      .then(json => dispatch(receiveData(data, JSONstat(json))));
  };
}
