import {put, takeLatest} from 'redux-saga/effects';
import type from './types';
import {SOCKET_ADDRESS} from 'config/constants';

export function* updateBook(action) {
  try {
    let wsBook = new WebSocket(SOCKET_ADDRESS);
    wsBook.onopen = function () {
      wsBook.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
        }),
      );
    };

    wsBook.onmessage = yield function (msg) {
      let response = JSON.parse(msg.data);
      console.log(response);
      if (response.hasOwnProperty('error')) {
        put({
          type: type.UPDATE_TICKER,
          error: response.error,
        });
      } else {
        put({
          type: type.UPDATE_TICKER_SUCCESS,
          data: response,
        });
      }
    };
  } catch (error) {
    yield put({
      type: type.UPDATE_TICKER_FAILED,
      error,
    });
  }
}

export default function* watch_getBook() {
  yield takeLatest(type.UPDATE_BOOK, updateBook);
}
